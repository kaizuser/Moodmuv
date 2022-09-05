// .toLowerCase() = Minuscula
// .toUpperCase() = Mayuscula
// .trim() = Quita los espacios
// .charAt() = Devuelve el caracter especificado
// .slice() = substring pero acepta indice negativo en resumen
// .substring() = El substring() método devuelve un subconjunto de un objeto String. indice a a indice b
// .replace(string, newString)
// .split() divide la cadena dada en array



//let convertirMayus = 'workshop: metodos string'
//convertirMayus.toUpperCase()

//let convertirMinus = 'WORKSHOP: METODOS STRING'
//convertirMinus.toLowerCase()

//let sacarEspacio = "    workshop: metodos string     "
//sacarEspacio.trim()

//let caracter = "workshop: metodos string"
//caracter.charAt(0)

//let fruta = "banana"
//fruta.slice(0,3)

//let cadena = "juan perez lopez"
//cadena.substring(22,16)

//let cadena = "hola cohorte 33 y 34"
//cadena.replace("cohorte", "comisión")

//let metodoSplit = "como andan alumnos?"
//metodoSplit.split(" ").join(" ")

//let mentores = ["lucas", "nicolas", "edu", "kevin", "cami", "lucre"]
//let mentoresFiltrados = mentores.filter(mentor=>mentor.startsWith("lu"))
//mentoresFiltrados

//concatenación de metodos string

//concatenación 1
//let ejemplo = "        hola gente de java      "
//ejemplo.trim().charAt(0).toUpperCase() + ejemplo.trim().substring(1)

//concatenación 2
//Lucas Ezequiel Silva
//let nombre = "lucas ezequiel silva"
//nombre.split(" ").map(palabra=>palabra.charAt(0).toUpperCase() + palabra.substring(1)).join(" ")