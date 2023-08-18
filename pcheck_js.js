let poke_id = 0
let poke_pid = 0
let poke_id_count = 0
let opa_count = 0
let genindex = 0
let pstage = 42 
let pstagem = 41 

let panels_main = document.getElementById("end_doc")
panels_main.innerHTML = ""

let pagevisited = " "
let pagegen = " "
let pageindex_start = 0
let pageend = 0
let pageend_ind = "N"

let nextpage_page_counter = 0
let firstpage = 0
let jstart = 0

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
let pokemonscount = [166, 272, 432, 553, 719, 800]
import {
    pokemon
} from "./pcheck_db.js"
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
    for (let j = 0; j < 9999; j++) {
        if (pokemon[j].Gen == 1) {
            poption[j] = document.createElement("option")
            poption[j].setAttribute("value", pokemon[j].name)
            poption[j].textContent = pokemon[j].name
            pselect.appendChild(poption[j])
        } else {
            j = 10000
        }
    }
}

window.pickPoke = function () {
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
    genindex = pindex
    poke_id = pindex
    for (let j = pindex; j < 9999; j++) {
        if (pokemon[j].Gen == (gvalue + 1)) {
            poption[j] = document.createElement("option")
            poption[j].setAttribute("value", pokemon[j].name)
            poption[j].textContent = pokemon[j].name
            pselect.appendChild(poption[j])
            console.log("j = " + j)
            if (j >= 799) {
                break;
            }
        } else {
            break;
        }
    }

}

window.finder = function () {
    finderPoke();
}

window.nextPage = function () {
    if (pagevisited == "Y") {
        if (pageend_ind == "Y") {
            window.alert("Gen list will end")
        } else {
            let pagestage = 0
            if (nextpage_page_counter == 0) {
                pageindex_start = genPointer[pagegen - 1] + pstagem
                nextpage_page_counter += 1
                pageend = pageindex_start + pstagem
            } else {
                pagestage = pokemonscount[pagegen - 1]
                pageindex_start += pstagem
                if (pageindex_start > pagestage) {
                    pageindex_start -= pstagem
                    pageend = pagestage
                    pageend_ind = "Y"
                } else {
                    pageend = pageindex_start + pstagem
                    if (pageend > pagestage) {
                        pageend = pagestage
                        pageend_ind = "Y"
                    }
                }
            }
            let panels = document.getElementById("end_doc")
            panels.innerHTML = ""
            let othername = ""
            let otherimage = ""
            let otherloc = ""
            let oname = ""
            let oimage = ""
            let pdivs = ""

            for (let d = pageindex_start; d < pageend; d++) {
                if (d >= 800) {
                    break;
                }
                othername = ""
                otherimage = ""
                othername = pokemon[d].name
                othername = othername.trim()

                if (othername.indexOf("Mega") > 0) {
                    otherimage = pokemon[d].id + "-mega" + ".png"
                    if ((othername.indexOf(" X") > 0) || (othername.indexOf("_X") > 0)) {
                        otherimage = pokemon[d].id + "-mega-x" + ".png"
                    }
                    if ((othername.indexOf(" Y") > 0) || (othername.indexOf("_Y") > 0)) {
                        otherimage = pokemon[d].id + "-mega-y" + ".png"
                    }
                } else {
                    otherimage = pokemon[d].id + ".png"
                    if (pokemon[d].id == 413) {
                        if (pokemon[d].Type2 == "Grass") {
                            otherimage = ""
                            otherimage = "413-plant" + ".png"
                        }
                        if (pokemon[d].Type2 == "Ground") {
                            otherimage = ""
                            otherimage = "413-sandy" + ".png"
                        }
                        if (pokemon[d].Type2 == "Steel") {
                            otherimage = ""
                            otherimage = "413-trash" + ".png"
                        }
                    }
                }

                otherloc = ""
                otherloc = "images/pokemon_images/" + otherimage

                oimage = ""
                oimage = document.createElement("img")
                oimage.setAttribute("src", otherloc)
                oimage.classList.add("card__image")

                oname = ""
                oname = document.createElement("div")
                oname.textContent = othername
                oname.classList.add("card__name")

                pdivs = ""
                pdivs = document.createElement("div")
                pdivs.setAttribute("data-toggle", "tooltip")
                pdivs.addEventListener('mouseover', mouseHover)

                pdivs.appendChild(oimage)
                pdivs.appendChild(oname)

                panels.appendChild(pdivs)
            }
        }
    }
}

window.previousPage = function () {
    if (pagevisited == "Y") {
        if (pageindex_start == 0 || firstpage == 1) {
            window.alert("Already in first page")
        } else {
            let othername = ""
            let otherimage = ""
            let otherloc = ""
            let oname = ""
            let oimage = ""
            let pdivs = ""
            let panels = document.getElementById("end_doc")
            jstart = 0
            if (pageindex_start != 1) {
                jstart = pageindex_start - pstagem
            }
            if (jstart < 0) {
                window.alert("Already in first page")
            } else {
                if ((pagegen == 2 && jstart <= genPointer[1]) || (pagegen == 3 && jstart <= genPointer[2]) ||
                    (pagegen == 4 && jstart <= genPointer[3]) || (pagegen == 5 && jstart <= genPointer[4]) ||
                    (pagegen == 6 && jstart <= genPointer[5]) || (pagegen == 1 && jstart <= genPointer[0])) {
                    if (pagegen == 1) {
                        pageindex_start = genPointer[0] + pstagem
                        firstpage = 1
                    }
                    if (pagegen == 2) {
                        pageindex_start = genPointer[1] + pstagem
                        firstpage = 1
                    }
                    if (pagegen == 3) {
                        pageindex_start = genPointer[2] + pstagem
                        firstpage = 1
                    }
                    if (pagegen == 4) {
                        pageindex_start = genPointer[3] + pstagem
                        firstpage = 1
                    }
                    if (pagegen == 5) {
                        pageindex_start = genPointer[4] + pstagem
                        firstpage = 1
                    }
                    if (pagegen == 6) {
                        pageindex_start = genPointer[5] + pstagem
                        firstpage = 1
                    }
                }
                panels.innerHTML = ""
                for (let d = pageindex_start - pstage; d <= pageindex_start; d++) {
                    if (d < 0 || (pagegen != pokemon[d].Gen)) {
                        break;
                    }
                    pageend_ind = "N"
                    othername = ""
                    otherimage = ""
                    othername = pokemon[d].name
                    othername = othername.trim()

                    if (othername.indexOf("Mega") > 0) {
                        otherimage = pokemon[d].id + "-mega" + ".png"
                        if ((othername.indexOf(" X") > 0) || (othername.indexOf("_X") > 0)) {
                            otherimage = pokemon[d].id + "-mega-x" + ".png"
                        }
                        if ((othername.indexOf(" Y") > 0) || (othername.indexOf("_Y") > 0)) {
                            otherimage = pokemon[d].id + "-mega-y" + ".png"
                        }
                    } else {
                        otherimage = pokemon[d].id + ".png"
                        if (pokemon[d].id == 413) {
                            if (pokemon[d].Type2 == "Grass") {
                                otherimage = ""
                                otherimage = "413-plant" + ".png"
                            }
                            if (pokemon[d].Type2 == "Ground") {
                                otherimage = ""
                                otherimage = "413-sandy" + ".png"
                            }
                            if (pokemon[d].Type2 == "Steel") {
                                otherimage = ""
                                otherimage = "413-trash" + ".png"
                            }
                        }
                    }

                    otherloc = ""
                    otherloc = "images/pokemon_images/" + otherimage

                    oimage = ""
                    oimage = document.createElement("img")
                    oimage.setAttribute("src", otherloc)
                    oimage.classList.add("card__image")

                    oname = ""
                    oname = document.createElement("div")
                    oname.textContent = othername
                    oname.classList.add("card__name")

                    pdivs = ""
                    pdivs = document.createElement("div")
                    pdivs.setAttribute("data-toggle", "tooltip")
                    pdivs.addEventListener('mouseover', mouseHover)

                    pdivs.appendChild(oimage)
                    pdivs.appendChild(oname)

                    panels.appendChild(pdivs)
                }

            }
        }
    }
    pageindex_start = jstart - pstagem
}

function mouseHover(eve) {
    let divele = eve.target.childNodes[1]
    let cname = divele.textContent
    cname = cname.trim()
    let dkit = " "
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name == cname) {
            dkit = "HP: " + pokemon[i].hp + " "
            break;
        }
    }
    let divmain = eve.target
    divmain.setAttribute("title",dkit)
}

document.addEventListener("DOMContentLoaded", finderPoke_init);

function finderPoke() {
    let poketemp = document.getElementById("poke_names")
    let pokename = poketemp.value
    for (let f = poke_id; f < 9999; f++) {
        if (pokemon[f].name.trim() == pokename.trim()) {
            poke_id_count += 1
            if (poke_id_count == 1) {
                poke_pid = f
            }
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
            } else {
                img_name = pokemon[f].id + ".png"
            }
            let img_loc = "images/pokemon_images/"
            let iname = document.getElementById("iname")
            let img_data = img_loc + img_name
            iname.setAttribute("src", img_data)

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
            } else {
                let tk = document.getElementById("t2")
                tk.style.visibility = "hidden"
            }

            let pokename = document.getElementById("p_name")
            pokename.innerText = pokemon[f].name

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

            let panels = document.getElementById("end_doc")
            panels.innerHTML = ""
            let othername = ""
            let otherimage = ""
            let otherloc = ""
            let oname = ""
            let oimage = ""
            let pdivs = ""

            let dk = genindex
            poke_id = poke_pid
            if (poke_pid >= 0) {
                for (let d = genindex; d < (genindex + pstagem); d++) {
                    if (d == genindex) {
                        pagevisited = "Y"
                        pagegen = pokemon[d].Gen
                        nextpage_page_counter = 0
                        pageindex_start = 0
                        pageend = 0
                        pageend_ind = "N"
                        firstpage = 0
                    }
                    othername = ""
                    otherimage = ""
                    othername = pokemon[d].name
                    othername = othername.trim()

                    if (othername.indexOf("Mega") > 0) {
                        otherimage = pokemon[d].id + "-mega" + ".png"
                        if ((othername.indexOf(" X") > 0) || (othername.indexOf("_X") > 0)) {
                            otherimage = pokemon[d].id + "-mega-x" + ".png"
                        }
                        if ((othername.indexOf(" Y") > 0) || (othername.indexOf("_Y") > 0)) {
                            otherimage = pokemon[d].id + "-mega-y" + ".png"
                        }
                    } else {
                        otherimage = pokemon[d].id + ".png"
                        if (pokemon[d].id == 413) {
                            if (pokemon[d].Type2 == "Grass") {
                                otherimage = ""
                                otherimage = "413-plant" + ".png"
                            }
                            if (pokemon[d].Type2 == "Ground") {
                                otherimage = ""
                                otherimage = "413-sandy" + ".png"
                            }
                            if (pokemon[d].Type2 == "Steel") {
                                otherimage = ""
                                otherimage = "413-trash" + ".png"
                            }
                        }
                    }

                    otherloc = ""
                    otherloc = "images/pokemon_images/" + otherimage

                    oimage = document.createElement("img")
                    oimage.setAttribute("src", otherloc)
                    oimage.classList.add("card__image")

                    oname = document.createElement("div")
                    oname.textContent = othername
                    oname.classList.add("card__name")

                    pdivs = ""
                    pdivs = document.createElement("div")
                    pdivs.setAttribute("data-toggle", "tooltip")
                    pdivs.addEventListener('mouseover', mouseHover)

                    pdivs.appendChild(oimage)
                    pdivs.appendChild(oname)

                    panels.appendChild(pdivs)
                }
            }
        }
    }
}

function finderPoke_init() {
    let poketemp = document.getElementById("poke_names")
    let pokename = poketemp.value
    pokename = "Bulbasaur";
    poke_id = 0;
    for (let f = poke_id; f < 9999; f++) {
        if (pokemon[f].name.trim() == pokename.trim()) {
            poke_id_count += 1
            if (poke_id_count == 1) {
                poke_pid = f
            }
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
            } else {
                img_name = pokemon[f].id + ".png"
            }
            let img_loc = "images/pokemon_images/"
            let iname = document.getElementById("iname")
            let img_data = img_loc + img_name
            iname.setAttribute("src", img_data)

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
            } else {
                let tk = document.getElementById("t2")
                tk.style.visibility = "hidden"
            }

            let pokename = document.getElementById("p_name")
            pokename.innerText = pokemon[f].name

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

            let panels = document.getElementById("end_doc")
            panels.innerHTML = ""
            let othername = ""
            let otherimage = ""
            let otherloc = ""
            let oname = ""
            let oimage = ""
            let pdivs = ""

            let dk = genindex
            poke_id = poke_pid
            if (poke_pid >= 0) {
                for (let d = genindex; d < (genindex + pstagem); d++) {
                    if (d == genindex) {
                        pagevisited = "Y"
                        pagegen = pokemon[d].Gen
                        nextpage_page_counter = 0
                        pageindex_start = 0
                        pageend = 0
                        pageend_ind = "N"
                        firstpage = 0
                    }
                    othername = ""
                    otherimage = ""
                    othername = pokemon[d].name
                    othername = othername.trim()

                    if (othername.indexOf("Mega") > 0) {
                        otherimage = pokemon[d].id + "-mega" + ".png"
                        if ((othername.indexOf(" X") > 0) || (othername.indexOf("_X") > 0)) {
                            otherimage = pokemon[d].id + "-mega-x" + ".png"
                        }
                        if ((othername.indexOf(" Y") > 0) || (othername.indexOf("_Y") > 0)) {
                            otherimage = pokemon[d].id + "-mega-y" + ".png"
                        }
                    } else {
                        otherimage = pokemon[d].id + ".png"
                        if (pokemon[d].id == 413) {
                            if (pokemon[d].Type2 == "Grass") {
                                otherimage = ""
                                otherimage = "413-plant" + ".png"
                            }
                            if (pokemon[d].Type2 == "Ground") {
                                otherimage = ""
                                otherimage = "413-sandy" + ".png"
                            }
                            if (pokemon[d].Type2 == "Steel") {
                                otherimage = ""
                                otherimage = "413-trash" + ".png"
                            }
                        }
                    }

                    otherloc = ""
                    otherloc = "images/pokemon_images/" + otherimage

                    oimage = document.createElement("img")
                    oimage.setAttribute("src", otherloc)
                    oimage.classList.add("card__image")

                    oname = document.createElement("div")
                    oname.textContent = othername
                    oname.classList.add("card__name")

                    pdivs = ""
                    pdivs = document.createElement("div")
                    pdivs.setAttribute("data-toggle", "tooltip")
                    pdivs.addEventListener('mouseover', mouseHover)

                    pdivs.appendChild(oimage)
                    pdivs.appendChild(oname)

                    panels.appendChild(pdivs)
                }
            }
        }
    }
}