# Standalone Minigame for Fivem(Inspired by NoPixel 4.0)

## Usage
1. Import the resource into your server resources.

   
## Example Command
```lua
RegisterCommand('alphabet', function(source, args)
    local letters = args[1]

    if letters then
        OpenMinigame(function(success)
            if success then
                print("Minigame completed successfully!")
            else
                print("Minigame failed.")
            end
        end, letters)
    else
        print("Usage: /alphabet <letters>")
    end
end)

or

local letters = "ABCDEFEGHIJKLMNOPQRSTUVWXYZ"
exports["rtn_alphabet"]:OpenMinigame(function(success)
    if success then
        print("success")
    else
        print("failed")
    end
end, "path", letters)
