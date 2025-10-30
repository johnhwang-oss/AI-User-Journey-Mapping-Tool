const NOTES_FIELD_ID = "interviewNotes";
const AR_NAME_FIELD_ID = "arName";
const REGION_FIELD_ID = "region";
const GENRE_FIELD_ID = "genreFocus";
const OUTPUT_CONTAINER_ID = "outputContainer";
const LOADING_INDICATOR_ID = "loadingIndicator";
const GENERATE_BUTTON_ID = "generateMapButton";

const API_URL = "http://localhost:5000/parse-notes";

const notesField = document.getElementById(NOTES_FIELD_ID);
const arNameField = document.getElementById(AR_NAME_FIELD_ID);
const regionField = document.getElementById(REGION_FIELD_ID);
const genreField = document.getElementById(GENRE_FIELD_ID);
const outputContainer = document.getElementById(OUTPUT_CONTAINER_ID);
const loadingIndicator = document.getElementById(LOADING_INDICATOR_ID);
const generateButton = document.getElementById(GENERATE_BUTTON_ID);

const showLoading = () => {
  loadingIndicator.hidden = false;
  generateButton.disabled = true;
};

const hideLoading = () => {
  loadingIndicator.hidden = true;
  generateButton.disabled = false;
};

const resetOutput = (message = "Your journey map will appear here...") => {
  outputContainer.className = "journey-map-placeholder";
  outputContainer.textContent = message;
};

const sanitizeText = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

const createDetail = (label, value, extraClass = "") => {
  const sanitizedValue = sanitizeText(value);
  if (!sanitizedValue) return null;

  const detail = document.createElement("div");
  detail.className = `task-detail ${extraClass}`.trim();

  const strong = document.createElement("span");
  strong.className = "task-detail__label";
  strong.textContent = `${label}:`;

  const text = document.createElement("span");
  text.textContent = sanitizedValue;

  detail.append(strong, text);
  return detail;
};

const createQuoteDetail = (label, value) => {
  const sanitizedValue = sanitizeText(value);
  if (!sanitizedValue) return null;

  const detail = document.createElement("div");
  detail.className = "task-detail";

  const strong = document.createElement("span");
  strong.className = "task-detail__label";
  strong.textContent = `${label}:`;

  const quote = document.createElement("span");
  quote.className = "task-detail__quote";
  quote.textContent = `“${sanitizedValue}”`;

  detail.append(strong, quote);
  return detail;
};

const renderJourneyMap = (parsedJourney) => {
  if (!parsedJourney || typeof parsedJourney !== "object") {
    resetOutput("Could not render the journey map.");
    return;
  }

  outputContainer.className = "journey-map";
  outputContainer.textContent = "";

  const meta = document.createElement("div");
  meta.className = "journey-meta";

  const nameChip = document.createElement("span");
  nameChip.textContent = `A&R: ${sanitizeText(parsedJourney.user_name) || "—"}`;
  meta.appendChild(nameChip);

  const regionChip = document.createElement("span");
  regionChip.textContent = `Region: ${sanitizeText(parsedJourney.region) || "—"}`;
  meta.appendChild(regionChip);

  const genreChip = document.createElement("span");
  genreChip.textContent = `Genre Focus: ${sanitizeText(parsedJourney.genre_focus) || "—"}`;
  meta.appendChild(genreChip);

  outputContainer.appendChild(meta);

  const phases = Array.isArray(parsedJourney.phases) ? parsedJourney.phases : [];

  if (!phases.length) {
    const emptyState = document.createElement("p");
    emptyState.textContent = "No phases were identified in the provided notes.";
    outputContainer.appendChild(emptyState);
    return;
  }

  const phaseLane = document.createElement("div");
  phaseLane.className = "phase-lane";

  phases.forEach((phase) => {
    const phaseCard = document.createElement("article");
    phaseCard.className = "phase-card";

    const title = document.createElement("h3");
    title.className = "phase-card__title";
    title.textContent = sanitizeText(phase?.overall_action) || "Unnamed Phase";
    phaseCard.appendChild(title);

    const tasks = Array.isArray(phase?.tasks) ? phase.tasks : [];

    if (!tasks.length) {
      const noTasks = document.createElement("p");
      noTasks.textContent = "No tasks captured for this phase.";
      phaseCard.appendChild(noTasks);
    } else {
      tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";

        const taskTitle = document.createElement("h4");
        taskTitle.className = "task-card__title";
        taskTitle.textContent = sanitizeText(task?.task) || "Untitled Task";
        taskCard.appendChild(taskTitle);

        const detailEntries = [
          createDetail("Tool", task?.tool_used),
          createDetail("Emotion", task?.emotion),
          createDetail("Pain Point", task?.pain_point, "task-detail--pain"),
          createDetail("Opportunity", task?.opportunity, "task-detail--opportunity"),
          createQuoteDetail("Key Quote", task?.key_quote),
          createDetail("Collaborators", task?.collaborators),
          createDetail("Frequency", task?.frequency),
        ].filter(Boolean);

        if (!detailEntries.length) {
          const filler = document.createElement("p");
          filler.textContent = "No additional detail captured.";
          filler.className = "task-detail";
          taskCard.appendChild(filler);
        } else {
          detailEntries.forEach((entry) => taskCard.appendChild(entry));
        }

        phaseCard.appendChild(taskCard);
      });
    }

    phaseLane.appendChild(phaseCard);
  });

  outputContainer.appendChild(phaseLane);
};

const buildRequestPayload = () => ({
  notes: sanitizeText(notesField.value),
  a_r_name: sanitizeText(arNameField.value),
  region: sanitizeText(regionField.value),
  genre_focus: sanitizeText(genreField.value),
});

const validatePayload = (payload) => {
  if (!payload.notes) {
    return "Please paste interview notes before generating a journey map.";
  }
  return null;
};

const handleGenerateMap = async () => {
  const payload = buildRequestPayload();
  const validationMessage = validatePayload(payload);

  if (validationMessage) {
    resetOutput(validationMessage);
    return;
  }

  showLoading();
  resetOutput("Building journey map...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    renderJourneyMap(data);
  } catch (error) {
    console.error("Failed to generate journey map", error);
    resetOutput(
      "We couldn't generate the journey map right now. Please try again or check the console for details."
    );
  } finally {
    hideLoading();
  }
};

generateButton?.addEventListener("click", handleGenerateMap);
