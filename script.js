const scriptExamples = {
  checkpointMove: String.raw`local UserInputService = game:GetService("UserInputService")
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
