let colors = {
    healthy: "#58ee9e",
    good: "#b0ee58",
    not_bad: "#eed358",
    bad: "#ee8058",
    fucked_up: "#ee5858"
}

const fill_color = (rank) => {
    switch(true){
        case rank < 36 && rank >= 0:
            return colors.healthy;
            break;
        case rank < 72 && rank >= 36:
            return colors.good;
            break;
        case rank < 108 && rank >= 72:
            return colors.not_bad;
            break;
        case rank < 144 && rank >= 108:
            return colors.bad;
            break;
        case rank >= 144:
            return colors.fucked_up;
            break;
    }
}

export default fill_color;