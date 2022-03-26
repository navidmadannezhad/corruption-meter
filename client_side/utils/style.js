let colors = {
    healthy: "#58ee9e",
    good: "#b0ee58",
    not_bad: "#eed358",
    bad: "#ee8058",
    fucked_up: "#ee5858"
}

const fill_color = (rank) => {
    switch(true){
        case rank >= 80:
            return colors.healthy;
            break;
        case rank < 80 && rank >= 60:
            return colors.good;
            break;
        case rank < 60 && rank >= 40:
            return colors.not_bad;
            break;
        case rank < 40 && rank >= 20:
            return colors.bad;
            break;
        case rank < 20:
            return colors.fucked_up;
            break;
    }
}

const style = (rank) => {
    return {
        fillColor: fill_color(rank),
        opacity: 1,
        color: fill_color(rank),
        fillOpacity: 0.7
    }
}

export default style;