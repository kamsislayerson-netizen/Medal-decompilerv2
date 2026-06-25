local v_u_1 = loadstring(game:HttpGet("https://sirius.menu/rayfield"))()
local v_u_2 = "https://pastebin.com/raw/ZWFwRjBJ"
local v3, v4 = pcall(function()
	-- upvalues: (ref) v_u_2
	return game:HttpGet(v_u_2)
end)
local v_u_5 = v3 and v4 and v4 or "default_key"
local v_u_6 = {
	{
		["question"] = "What is 5 + 3?",
		["answer"] = "8"
	},
	{
		["question"] = "Spell \'cat\' backwards.",
		["answer"] = "tac"
	},
	{
		["question"] = "What is 2 x 6?",
		["answer"] = "12"
	}
}
local v_u_7 = {}
local v_u_8 = false
local function v_u_11()
	local v9, v10 = pcall(function()
		loadstring(game:HttpGet("https://raw.githubusercontent.com/checkurasshole/Script/refs/heads/main/Prov4"))()
	end)
	if not v9 then
		warn("Error loading script: " .. v10)
	end
end
local function v_u_13(p12)
	game.Players.LocalPlayer:Kick(({
		["key"] = "Wrong key, you absolute **brain-dead** moron. \n\nYou can\226\128\153t even copy-paste correctly? Your existence is a glitch in the matrix. \n\nGo drool somewhere else, you waste of carbon. \239\191\189\239\191\189\239\191\189\239\191\189\239\191\189\239\191\189",
		["iq"] = "Congrats on failing the most basic IQ test, you **oxygen-stealing** clown \239\191\189\239\191\189\239\191\189\239\191\189\239\191\189\239\191\189. \n\nCouldn\'t answer \'What is 5 + 3?\'\226\128\148now you\'re a **breathing disappointment**. Every time you think, a brain cell commits suicide out of embarrassment. \n\nNASA just confirmed: you\226\128\153re the reason aliens refuse to visit Earth.  \n\nYou proved why birth control exists. \239\191\189\239\191\189\239\191\189\239\191\189\239\191\189\239\191\189 Now get the fuck out. \239\191\189\239\191\189\239\191\189\239\191\189\239\191\189\239\191\189"
	})[p12] or "Get lost, loser.")
end
local v14 = v_u_1:CreateWindow({
	["Name"] = "ComboChronicle Vault | IQ Test Loader",
	["LoadingTitle"] = "Loading ComboChronicle Vault \226\157\150",
	["LoadingSubtitle"] = "By COMBO_WICK | Bang.E.Line",
	["Theme"] = "Ocean"
})
v14:CreateTab("Key Verification", 4483362458):CreateInput({
	["Name"] = "Enter Key",
	["PlaceholderText"] = "Paste the key here...",
	["RemoveTextAfterFocusLost"] = false,
	["Callback"] = function(p15)
		-- upvalues: (ref) v_u_5, (ref) v_u_8, (ref) v_u_1, (ref) v_u_13
		if p15 ~= v_u_5 then
			v_u_1:Notify({
				["Title"] = "\239\191\189\239\191\189 Invalid Key",
				["Content"] = "Wrong key, dipshit. Try again or get lost.",
				["Duration"] = 5,
				["Image"] = 4483362458
			})
			wait(5)
			v_u_13("key")
		else
			v_u_8 = true
			v_u_1:Notify({
				["Title"] = "\239\191\189\239\191\189 Key Accepted",
				["Content"] = "Key verified! Proceed to the IQ test.",
				["Duration"] = 3,
				["Image"] = 4483362458
			})
		end
	end
})
local v16 = v14:CreateTab("IQ Test", 4483362458)
local function v_u_21()
	-- upvalues: (ref) v_u_8, (ref) v_u_1, (ref) v_u_6, (ref) v_u_7, (ref) v_u_13, (ref) v_u_11
	if v_u_8 then
		local v17, v18, v19 = ipairs(v_u_6)
		while true do
			local v20
			v19, v20 = v17(v18, v19)
			if v19 == nil then
				break
			end
			if v_u_7[v19] ~= v20.answer then
				v_u_1:Notify({
					["Title"] = "\239\191\189\239\191\189 Incorrect Answer",
					["Content"] = "Are you seriously failing this? Get ready faggot.",
					["Duration"] = 5,
					["Image"] = 4483362458
				})
				wait(5)
				v_u_13("iq")
				return
			end
		end
		v_u_1:Destroy()
		print("Correct answers! Loading the script...")
		v_u_11()
	else
		v_u_1:Notify({
			["Title"] = "\239\191\189\239\191\189 Access Denied",
			["Content"] = "Enter the correct key first, you illiterate fuck.",
			["Duration"] = 5,
			["Image"] = 4483362458
		})
	end
end
local v22, v23, v_u_24 = ipairs(v_u_6)
local v_u_25 = v_u_6
local v_u_26 = v_u_7
while true do
	local v27
	v_u_24, v27 = v22(v23, v_u_24)
	if v_u_24 == nil then
		break
	end
	v16:CreateInput({
		["Name"] = v27.question,
		["PlaceholderText"] = "Type your answer here...",
		["RemoveTextAfterFocusLost"] = false,
		["Callback"] = function(p28)
			-- upvalues: (ref) v_u_26, (ref) v_u_24, (ref) v_u_25, (ref) v_u_21
			v_u_26[v_u_24] = p28
			if #v_u_26 == #v_u_25 then
				v_u_21()
			end
		end
	})
end