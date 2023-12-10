const points = {
    0: 5,
    1: 12,
    2: 5,
    3: 8,
    4: 9,
    5: 0,
    6: 2,
    7: 4,
};

// get the highest value from the object above
const highestValue = Object.keys(points).reduce((a, b) =>
points[a] > points[b] ? a : b
);
