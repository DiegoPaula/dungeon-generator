document.addEventListener("DOMContentLoaded", async () => {
    return await render(createMap(20))
})

function createMap(dim) {

    const DIM = dim;
    const MAXTUNEL = DIM * 2.5;
    const MAXTUNELLENGTH = DIM / 2.5;

    const map = createArray(DIM);
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    let tunnelCount = MAXTUNEL;
    let lastDirection = [];
    let randomDirection;
    let posX = Math.floor(Math.random() * DIM);
    let posY = Math.floor(Math.random() * DIM);

    while (tunnelCount) {

        do {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
        } while (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1] ||
            randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1])

        let randomLength = Math.ceil(Math.random() * MAXTUNELLENGTH);
        let currentLength = 0;

        while (currentLength < randomLength) {
            if ((posX <= 3) && (randomDirection[0] === -1) ||
                (posY <= 3) && (randomDirection[1] === -1) ||
                (posX >= DIM - 4) && (randomDirection[0] === 1) ||
                (posY >= DIM - 4) && (randomDirection[1] === 1)) {
                break;
            } else {
                map[posX][posY] = 1;
                posX += randomDirection[0];
                posY += randomDirection[1];
                currentLength++;
            }
        }
        if (currentLength) {
            lastDirection = randomDirection;
            tunnelCount--;
        }
    }
    return map
}

function createArray(dim) {
    arr = [];
    for (let x = 0; x < dim; x++) {
        arr.push([]);
        for (let y = 0; y < dim; y++) {
            arr[x].push(0);
        }
    }
    return arr;
}

function render(arr) {

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d');
    const resolution = 300/arr.length;
    canvas.width = 300;
    canvas.height = 300;

    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[x].length; y++) {
            const position = arr[x][y];

            ctx.beginPath();
            ctx.rect(x * resolution, y * resolution, resolution, resolution)
            ctx.fillStyle = position ? "#494d51" : Math.round(Math.random()) == 0 ? "#3B270C" : "#351E10";
            ctx.fill();
        }
    }
}