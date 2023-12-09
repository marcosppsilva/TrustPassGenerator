function passGenerator(description) {
    const alfanumchar = "qwertyuiopasdfghjklzxcvbnm*-_.#$&@QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let pass = "";

    for (let i = 0; i <= 11; i++){
        pass += alfanumchar[Math.floor(Math.random() * alfanumchar.length)];
    }
    return pass;
}

module.exports = {
    passGenerator
}