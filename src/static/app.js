document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        // Create activity name
        const h4 = document.createElement("h4");
        h4.textContent = name;
        activityCard.appendChild(h4);

        // Create description
        const descP = document.createElement("p");
        descP.textContent = details.description;
        activityCard.appendChild(descP);

        // Create schedule
        const scheduleP = document.createElement("p");
        const scheduleStrong = document.createElement("strong");
        scheduleStrong.textContent = "Schedule:";
        scheduleP.appendChild(scheduleStrong);
        scheduleP.appendChild(document.createTextNode(" " + details.schedule));
        activityCard.appendChild(scheduleP);

        // Create availability
        const availP = document.createElement("p");
        const availStrong = document.createElement("strong");
        availStrong.textContent = "Availability:";
        availP.appendChild(availStrong);
        availP.appendChild(document.createTextNode(` ${spotsLeft} spots left`));
        activityCard.appendChild(availP);

        // Participants section
        const participantsSection = document.createElement("div");
        participantsSection.className = "participants-section";
        const participantsStrong = document.createElement("strong");
        participantsStrong.textContent = "Participants:";
        participantsSection.appendChild(participantsStrong);

        if (details.participants.length > 0) {
          const ul = document.createElement("ul");
          ul.className = "participants-list";
          details.participants.forEach(p => {
            const li = document.createElement("li");
            const emailSpan = document.createElement("span");
            emailSpan.className = "participant-email";
            emailSpan.textContent = p;
            const deleteIcon = document.createElement("span");
            deleteIcon.className = "delete-icon";
            deleteIcon.title = "Remove participant";
            deleteIcon.textContent = "×";
            deleteIcon.setAttribute("data-activity", name);
            deleteIcon.setAttribute("data-email", p);
            li.appendChild(emailSpan);
            li.appendChild(deleteIcon);
            ul.appendChild(li);
          });
          participantsSection.appendChild(ul);
        } else {
          const noP = document.createElement("p");
          noP.className = "no-participants";
          noP.textContent = "No participants yet.";
          participantsSection.appendChild(noP);
        }
        activityCard.appendChild(participantsSection);
        // Add event listener for delete icons after rendering
        setTimeout(() => {
          activityCard.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', async (e) => {
              const activityName = icon.getAttribute('data-activity');
              const email = icon.getAttribute('data-email');
              if (!activityName || !email) return;
              try {
                const response = await fetch(`/activities/${encodeURIComponent(activityName)}/unregister?email=${encodeURIComponent(email)}`, {
                  method: 'POST',
                });
                const result = await response.json();
                if (response.ok) {
                  messageDiv.textContent = result.message || 'Participant removed.';
                  messageDiv.className = 'success';
                  fetchActivities();
                } else {
                  messageDiv.textContent = result.detail || 'Failed to remove participant.';
                  messageDiv.className = 'error';
                }
                messageDiv.classList.remove('hidden');
                setTimeout(() => {
                  messageDiv.classList.add('hidden');
                }, 4000);
              } catch (err) {
                messageDiv.textContent = 'Error removing participant.';
                messageDiv.className = 'error';
                messageDiv.classList.remove('hidden');
                setTimeout(() => {
                  messageDiv.classList.add('hidden');
                }, 4000);
              }
            });
          });
        }, 0);

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
        fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
