local callback = nil
local isInMinigame = false

local OpenMinigame = function(cb, letters)
    if isInMinigame then
        return
    end

    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "OpenMinigame",
        letters = letters,
    })

    callback = cb
end

RegisterNUICallback("CloseMinigame", function(data)
    if callback then
        callback(data.esito)
        callback = nil
    end

    isInMinigame = false
    SetNuiFocus(false, false)
end)

exports('OpenMinigame', OpenMinigame)

-- RegisterCommand('alphabet', function(source, args)
--     local letters = args[1]

--     if letters then
--         print(letters)
--         OpenMinigame(function(success)
--             if success then
--                 print("success")
--             else
--                 print("failed")
--             end
--         end, letters)
--     else
--         print("Usage: /alfabeto <letters>")
--     end
-- end)


-- local letters = "ABCDEFEGHIJKLMNOPQRSTUVWXYZ"
-- exports["rtn_alphabet"]:OpenMinigame(function(success)
--     if success then
--         print("success")
--     else
--         print("failed")
--     end
-- end, "path", letters)
