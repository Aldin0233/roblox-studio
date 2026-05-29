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
  flyButton: `local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local button = script.Parent

local flying = false
local flyLoop = nil

local FLY_SPEED = 60 -- 고정 속도

button.MouseButton1Click:Connect(function()
    flying = not flying

    local character = player.Character or player.CharacterAdded:Wait()
    local humanoid = character:WaitForChild("Humanoid")
    local root = character:WaitForChild("HumanoidRootPart")

    if flying then
        button.Text = "날기 ON"
        humanoid.PlatformStand = true

        flyLoop = RunService.RenderStepped:Connect(function()
            local camera = workspace.CurrentCamera
            local move = Vector3.new(0, 0, 0)

            if UserInputService:IsKeyDown(Enum.KeyCode.W) then
                move = move + camera.CFrame.LookVector
            end

            if UserInputService:IsKeyDown(Enum.KeyCode.S) then
                move = move - camera.CFrame.LookVector
            end

            if UserInputService:IsKeyDown(Enum.KeyCode.A) then
                move = move - camera.CFrame.RightVector
            end

            if UserInputService:IsKeyDown(Enum.KeyCode.D) then
                move = move + camera.CFrame.RightVector
            end

            if UserInputService:IsKeyDown(Enum.KeyCode.Space) then
                move = move + Vector3.new(0, 1, 0)
            end

            if UserInputService:IsKeyDown(Enum.KeyCode.LeftShift) then
                move = move - Vector3.new(0, 1, 0)
            end

            if move.Magnitude > 0 then
                root.AssemblyLinearVelocity = move.Unit * FLY_SPEED
            else
                root.AssemblyLinearVelocity = Vector3.new(0, 0, 0)
            end
        end)
    else
        button.Text = "날기 OFF"
        humanoid.PlatformStand = false

        if flyLoop then
            flyLoop:Disconnect()
            flyLoop = nil
        end

        root.AssemblyLinearVelocity = Vector3.new(0, 0, 0)
    end
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
