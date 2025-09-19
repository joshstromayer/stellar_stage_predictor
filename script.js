const ranges = {
    O: {
        V: {mass_r: [16, 60], radius_r: [6, 15], absmag_r: [-4.5, -5.5]},
        III: {mass_r: [30, 70], radius_r: [30, 70], absmag_r: [-5.5, -7]},
        I: {mass_r: [40, 150], radius_r: [25, 60], absmag_r: [-7, -8.5]},
    },
    B: {
        V: {mass_r: [2, 16], radius_r: [3, 7], absmag_r: [-1, -3]},
        III: {mass_r: [5, 18], radius_r: [10, 20], absmag_r: [-3, -5]},
        I: {mass_r: [15, 25], radius_r: [25, 50], absmag_r: [-5, -7]},
    },
    A: {
        V: {mass_r: [1.6, 3], radius_r: [1.4, 2.5], absmag_r: [1, 0]},
        III: {mass_r: [2, 4], radius_r: [5, 10], absmag_r: [-1, -3]},
        I: {mass_r: [5, 10], radius_r: [20, 30], absmag_r: [-4, -5.5]},
    },
}

class StarClassifiction {
    constructor(mass, radius, temperature, gmag) {
        this.r = 6.957*10**8
        this.mass = mass
        this.radius_q = radius // multiple of R
        this.radius = radius * this.r
        this.temperature = temperature
        this.gmag = gmag
        this.luminosity = 4*3.14*(this.radius**2)*(5.67*10**-8)*(this.temperature**4)
        this.canvas_star_colour;
    }

    stellar_classification () {
        let stellar_classification = 'N/A';
        let stellar_classification_nl = 'N/A';

        if (this.temperature >=30000) {
            stellar_classification = 'O'
            this.canvas_star_colour = "#0073ff"
        } else if (this.temperature >= 20000) {
            stellar_classification = 'B'
            this.canvas_star_colour = "#4eafff"
        } else if (this.temperature >= 10000) {
            stellar_classification = 'B'
            this.canvas_star_colour = "#c3edff"
        } else if (this.temperature > 7500) {
            stellar_classification = 'A'
            this.canvas_star_colour = "#fce788"
        } else if (this.temperature > 6000) {
            stellar_classification = 'F'
            this.canvas_star_colour = "#fcc63c"
        } else if (this.temperature > 5200) {
            stellar_classification = 'G'
            this.canvas_star_colour = "#e68517"
        } else if (this.temperature > 3700) {
            stellar_classification = 'K'
            this.canvas_star_colour = "#e07442"
        } else if (this.temperature > 3000) {
            stellar_classification = 'K'
            this.canvas_star_colour = "#ec7a24"
        } else if (this.temperature > 2400) {
            stellar_classification = 'M'
            this.canvas_star_colour = "#cf2d2d"
        } else if (this.temperature > 1300) {
            stellar_classification_nl = 'L'
            this.canvas_star_colour = "#9c3b06"
        } else if (this.temperature > 700) {
            stellar_classification_nl = 'T'
            this.canvas_star_colour = "#4b1a04"
        } else {
            stellar_classification_nl = 'Y'
            this.canvas_star_colour = "#1c0a02"
        }
        
        if (stellar_classification != 'N/A') {
            return stellar_classification
        } else {
            return stellar_classification_nl
        }
    }

    luminosity_classification () {
        let stellar_classification = this.stellar_classification()

        let classification = 'N/A'

        const stellar_value = ranges[stellar_classification]

        if (stellar_value) {
            for (const[luminosityClass, criteria] of Object.entries(stellar_value)) {
                const mass_t = !criteria.mass_r || this.mass > criteria.mass_r[0] && this.mass < criteria.mass_r[1]
                const radius_t = !criteria.radius_r || this.radius_q > criteria.radius_r[0] && this.radius_q < criteria.radius_r[1]
                const absmag_t = !criteria.absmag_r || this.gmag > criteria.absmag_r[1] && this.gmag < criteria.absmag_r[0]
        
                if (mass_t && radius_t && absmag_t) {
                    classification = luminosityClass
                    break
                }
            }
        }

        return classification;

    }

    calculate_canvas_scale () {
        this.canvas_scale = this.radius/3
    }

    calculate_star_canvas_size () {
        if (this.radius_q >= 1) {
            this.canvas_star_radius = 150
        } else {
            this.canvas_star_radius = 150 - (1-this.radius_q)*100
        }
        return this.canvas_star_radius
    }

    calculate_sun_canvas_size () {
        if (this.radius_q >= 1) {
            this.canvas_sun_radius = 150 - (this.radius_q-1)*10
        } else {
            this.canvas_sun_radius = 150
        }
        return this.canvas_sun_radius     
    }

    calculate_scale_line (radius) {
        return 200+radius
    }

    canvas_text_placement () {
        return 200+(200-this.calculate_scale_line())*0.5-10
    }

    canvas_display_radius () {
        if (this.radius_q < 1) {
            console.log(this.radius.toString().length-1)
            return (this.radius/(10**(this.radius.toString().length-1))).toFixed(2) + "x10^" + (this.radius.toString().length-1) + "m"
        } else {
            console.log(this.r.toString().length-1)
            return (this.r/(10**(this.r.toString().length-1))).toFixed(2) + "x10^" + (this.r.toString().length-1) + "m"
        }
    }

    draw (star_radius) {
        const canvas = document.getElementById("myCanvas")
        const ctx = canvas.getContext("2d")
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        this.stellar_classification()
        let classification;

        if (this.luminosity_classification() != "N/A"){
            classification = "Classification: " + this.stellar_classification() + " " + this.luminosity_classification()
        } else {
            classification = "Classification: " + this.stellar_classification()
        }

        ctx.clearRect(0, 0, 400, 400)

        // Star
        ctx.beginPath()
        ctx.fillStyle = this.canvas_star_colour
        ctx.arc(200, 200, star_radius, 0, 2*Math.PI*this.radius**2)
        ctx.fill()
        ctx.stroke()

        if (this.radius_q<1 && window.innerWidth > 600) {
            // Lines for scale
            ctx.strokeStyle = "white"
            ctx.fillStyle = "white"
            ctx.beginPath()
            ctx.moveTo(200, 380)
            ctx.lineTo(this.calculate_scale_line(star_radius), 380)
            ctx.stroke()
        }

        ctx.fillStyle = "white"
        ctx.font = "30px Garamond"
        ctx.fillText("Your Star", 200, 30)

        ctx.fillStyle = "white"
        ctx.font = "20px Garamond"
        ctx.fillText(classification, 200, 380)

    }

    draw_sun (sun_radius) {
        const canvas = document.getElementById("myCanvas01")
        const ctx01 = canvas.getContext("2d")
        this.stellar_classification()
        ctx01.textAlign = "center";
        ctx01.textBaseline = "middle";

        ctx01.clearRect(0, 0, 400, 400)

        // Star
        ctx01.beginPath()
        ctx01.fillStyle = "yellow"
        ctx01.arc(200, 200, sun_radius, 0, 2*Math.PI*this.radius**2)
        ctx01.fill()
        ctx01.stroke()

        ctx01.fillStyle = "white"
        ctx01.font = "30px Garamond"
        ctx01.fillText("The Sun", 200, 30)

        if (this.radius_q>1 && window.innerWidth > 600) {
            // Lines for scale
            ctx01.strokeStyle = "white"
            ctx01.beginPath()
            ctx01.moveTo(200, 380)
            ctx01.lineTo(this.calculate_scale_line(sun_radius), 380)
            ctx01.stroke()
    
            // Lines for arrows
            ctx01.beginPath()
            ctx01.moveTo(200, 380)
            ctx01.lineTo(205, 385)
            ctx01.stroke()
    
            ctx01.beginPath()
            ctx01.moveTo(200, 380)
            ctx01.lineTo(205, 375)
            ctx01.stroke()
    
            ctx01.beginPath()
            ctx01.moveTo(this.calculate_scale_line(sun_radius), 380)
            ctx01.lineTo(this.calculate_scale_line(sun_radius)-5, 385)
            ctx01.stroke()
    
            ctx01.beginPath()
            ctx01.moveTo(this.calculate_scale_line(sun_radius), 380)
            ctx01.lineTo(this.calculate_scale_line(sun_radius)-5, 375)
            ctx01.stroke()

            ctx01.font = "13px Garamond"
            ctx01.beginPath()
            ctx01.fillText(this.canvas_display_radius(), 200+(this.calculate_scale_line(sun_radius)-200)/2, 370 )
        }
    }
}

const draw_star_template = () => {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "white"
    ctx.font = "30px Garamond"
    ctx.fillText("Your Star", 200, 30)
}

const draw_sun_template = () => {
    const canvas = document.getElementById("myCanvas01")
    const ctx01 = canvas.getContext("2d")
    ctx01.textAlign = "center";
    ctx01.textBaseline = "middle";

    // Star
    ctx01.beginPath()
    ctx01.fillStyle = "yellow"
    ctx01.arc(200, 200, 100, 0, 2*Math.PI*100)
    ctx01.fill()
    ctx01.stroke()

    ctx01.fillStyle = "white"
    ctx01.font = "30px Garamond"
    ctx01.fillText("The Sun", 200, 30)
}

const canvas_star = document.getElementById("myCanvas")
const ctx = canvas_star.getContext("2d")
const canvas_sun = document.getElementById("myCanvas01")
const ctx01 = canvas_sun.getContext("2d")


if (canvas_star) {
    draw_sun_template()
    draw_star_template()
}


document.getElementById("submit_id").addEventListener("click", function(event) {
    event.preventDefault()
    
    const mass = parseFloat(document.getElementById("mass_input").value)
    const radius = parseFloat(document.getElementById("radius_input").value)
    const temperature = parseFloat(document.getElementById("temperature_input").value)
    const gmag = parseFloat(document.getElementById("gmag_input").value)
    
    // const model = new StarClassifiction(13, 9, 15600, -4)
    let model;
    if (mass, radius) {
        model = new StarClassifiction(mass, radius, temperature, gmag)
    }

    const sun_radius = model.calculate_sun_canvas_size()
    const star_radius = model.calculate_star_canvas_size()

    model.draw(star_radius)
    model.draw_sun(sun_radius)

});

// resizeCanvas();

// window.addEventListener("resize", resizeCanvas)