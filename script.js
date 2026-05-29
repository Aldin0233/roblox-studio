const scriptExamples = {
  killPart: `local part = script.Parent

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        humanoid.Health = 0
    end
end)`,
  checkpointTeleport: `local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local checkpointsFolder = workspace:WaitForChild("체크포인트")

local currentIndex = 1

local function teleportToCheckpoint(index)
    local checkpoint = checkpointsFolder:FindFirstChild("check" .. tostring(index))
    if not checkpoint then return end

    local character = player.Character or player.CharacterAdded:Wait()
    local hrp = character:WaitForChild("HumanoidRootPart")

    hrp.CFrame = checkpoint.CFrame + Vector3.new(0, 5, 0)
end

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end

    print(input.KeyCode)

    if input.KeyCode == Enum.KeyCode.N then
        currentIndex += 1
        teleportToCheckpoint(currentIndex)
    elseif input.KeyCode == Enum.KeyCode.B then
        currentIndex -= 1

        if currentIndex < 1 then
            currentIndex = 1
        end

        teleportToCheckpoint(currentIndex)
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
  let copied = false;

  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }

  if (!copied) {
    throw new Error("Copy failed");
  }
}

const defaultButtonText = new WeakMap();
const copyStatus = document.querySelector(".copy-status");

function getDefaultButtonText(button) {
  if (!defaultButtonText.has(button)) {
    defaultButtonText.set(button, button.textContent.trim());
  }

  return defaultButtonText.get(button);
}

document.addEventListener("click", async (event) => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("[data-copy-example]");

  if (!button) return;

  const text = scriptExamples[button.dataset.copyExample];
  if (!text) return;

  const defaultText = getDefaultButtonText(button);

  button.disabled = true;

  try {
    await copyText(text);
    button.classList.add("is-copied");
    button.textContent = "복사 완료";
    if (copyStatus) {
      copyStatus.textContent = `${defaultText} 복사 완료`;
    }
  } catch {
    button.textContent = "복사 실패";
    if (copyStatus) {
      copyStatus.textContent = `${defaultText} 복사 실패`;
    }
  }

  window.setTimeout(() => {
    button.classList.remove("is-copied");
    button.textContent = defaultText;
    button.disabled = false;
    if (copyStatus) {
      copyStatus.textContent = "";
    }
  }, 1800);
});
