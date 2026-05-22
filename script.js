const scriptExamples = {
  killPart: `local part = script.Parent

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        humanoid.Health = 0
    end
end)`,
  firstPersonToggle: `local player = game.Players.LocalPlayer
local input = game:GetService("UserInputService")

local firstPerson = false

input.InputBegan:Connect(function(key, gameProcessed)
    if gameProcessed then return end

    if key.KeyCode == Enum.KeyCode.V then
        firstPerson = not firstPerson

        if firstPerson then
            player.CameraMode = Enum.CameraMode.LockFirstPerson
        else
            player.CameraMode = Enum.CameraMode.Classic
            player.CameraMinZoomDistance = 6
            player.CameraMaxZoomDistance = 12
        end
    end
end)`,
  scoreBoard: `game.Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")

    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local deaths = Instance.new("IntValue")

    deaths.Name = "Deaths"
    deaths.Value = 0
    deaths.Parent = leaderstats

    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")

        humanoid.Died:Connect(function()
            deaths.Value += 1
        end)
    end)
end)`,
};

const copyButtons = document.querySelectorAll("[data-copy-example]");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

copyButtons.forEach((button) => {
  const defaultText = button.textContent.trim();

  button.addEventListener("click", async () => {
    const text = scriptExamples[button.dataset.copyExample];
    if (!text) return;

    button.disabled = true;

    try {
      await copyText(text);
      button.classList.add("is-copied");
      button.textContent = "복사 완료";

      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.textContent = defaultText;
        button.disabled = false;
      }, 1800);
    } catch {
      button.textContent = "복사 실패";
      window.setTimeout(() => {
        button.textContent = defaultText;
        button.disabled = false;
      }, 1800);
    }
  });
});
