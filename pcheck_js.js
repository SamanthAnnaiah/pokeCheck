let poke_id = 0
let opa_count = 0
let opa_var = 0
let m_card = ""

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "hsla(27, 84%, 44%, 1)",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  dark: "hsla(210, 78%, 9%, 0.601)",
  water: "#0190FF"
};

let gens = ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6"]
let genPointer = [1, 167, 273, 433, 554, 719]
import { pokemon } from "./pcheck_db.js"
start()

function start() {
    let goption = []
    let gselect = document.getElementById("poke_gen")
    for (let k = 0; k < gens.length; k++) {
        goption[k] = document.createElement("option")
        goption[k].setAttribute("value", gens[k])    
        goption[k].textContent = gens[k]
        gselect.appendChild(goption[k])
    }

    let poption = []
    let pselect = document.getElementById("poke_names")
    for (let j =0;j < 9999; j++) {
        if (pokemon[j].Gen == 1) {
            poption[j] = document.createElement("option")
            poption[j].setAttribute("value", pokemon[j].name)    
            poption[j].textContent = pokemon[j].name
            pselect.appendChild(poption[j])  
        }
        else {
            j = 10000
        }
    }
}

window.pickPoke = function() {
    let selectedGen = document.getElementById("poke_gen")
    let genValue = selectedGen.value 
    loadPoke(genValue)
}

function loadPoke(genValue) {
    let poption = []
    let pselect = document.getElementById("poke_names")
    pselect.innerText = ""
    let gvalue = gens.indexOf(genValue)
    let pindex = genPointer[gvalue]
    pindex = pindex - 1
    poke_id = pindex
    for (let j = pindex; j < 9999; j++) {
        if (pokemon[j].Gen == (gvalue + 1)) {
            poption[j] = document.createElement("option")
            poption[j].setAttribute("value", pokemon[j].name)    
            poption[j].textContent = pokemon[j].name
            pselect.appendChild(poption[j])  
        }
        else {
            j = 10000 
        }
    }

}

window.finder = function () {
    let poketemp = document.getElementById("poke_names")
    let pokename = poketemp.value
    for (let f = poke_id; f < 9999; f++) {
        if (pokemon[f].name.trim() == pokename.trim()) {

            let img_name = " "
            let poke_card = document.getElementById("poke_card")
            poke_card.style.opacity = 0 

            let temp_name = pokemon[f].name.trim()
            if (temp_name.indexOf("Mega") > 0) {
                img_name = pokemon[f].id + "-mega" + ".png"
                if ((temp_name.indexOf(" X") > 0) || (temp_name.indexOf("_X") > 0)) {
                    img_name = pokemon[f].id + "-mega-x" + ".png"
                }   
                if ((temp_name.indexOf(" Y") > 0) || (temp_name.indexOf("_Y") > 0)) {
                    img_name = pokemon[f].id + "-mega-y" + ".png"
                }  
            }
            else {
                img_name = pokemon[f].id + ".png"
            }
            let img_loc = "images/pokemon_images/"
            let iname = document.getElementById("iname")
            let img_data = img_loc + img_name
            iname.setAttribute("src",img_data)

            let poke_type = pokemon[f].Type1
            poke_type = poke_type.toLowerCase()
            let col = eval("typeColor." + poke_type)
            let pbg = document.getElementById("poke_card")
            pbg.style.backgroundColor = col

            let poke_hp = pokemon[f].hp
            let php = document.getElementById("p_hp")
            php.innerText = "HP " + poke_hp

            let poke_t1 = pokemon[f].Type1
            let poke_t2 = pokemon[f].Type2
            document.getElementById("t1").textContent = poke_t1.trim()
            if (poke_t2 != "") {
                document.getElementById("t2").textContent = poke_t2.trim()
            }
            else {
                let tk = document.getElementById("t2")
                tk.style.visibility = "hidden"
            }

            let pokename = document.getElementById("p_name")
            pokename.innerText =  pokemon[f].name

            let pdetails = document.getElementById("other_det")
            pdetails.innerText = ""
            let adiv = document.createElement("div")
            adiv.innerText = "Attack: " + pokemon[f].Attack
            pdetails.appendChild(adiv)

            let ddiv = document.createElement("div")
            ddiv.innerText = "Defence: " + pokemon[f].Defence
            pdetails.appendChild(ddiv)

            let spdiv = document.createElement("div")
            spdiv.innerText = "Sp.Attack: " + pokemon[f].SpAtk
            pdetails.appendChild(spdiv)

            let sddiv = document.createElement("div")
            sddiv.innerText = "Sp.Defence: " + pokemon[f].SpDef
            pdetails.appendChild(sddiv)

            let sediv = document.createElement("div")
            sediv.innerText = "Speed: " + pokemon[f].Speed
            pdetails.appendChild(sediv)

            let legend_status = pokemon[f].Legend.toLowerCase()
            if (legend_status == "true") {
                let tldiv = document.createElement("div")
                tldiv.innerText = "Legendary: " + pokemon[f].Legend
                pdetails.appendChild(tldiv)
            }
        
            f = 10000
            // poke_card.style.visibility = "visible"
            opa_count = 0 
            let opa_var = setInterval(() => {
                            opa_count += 0.1 
                            poke_card.style.opacity = opa_count
                            if (opa_count > 1) {
                                clearInterval(opa_var)
                            }
                        }, 50);
        }
    }
}