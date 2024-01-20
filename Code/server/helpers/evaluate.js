const evaluateIngredients = (ingredients) => {
  let greenCount = 0;
  let yellowCount = 0;
  let redCount = 0;

  const greenCriteria = [
    "organic certification",
    "natural and whole foods",
    "regulatory approval",
  ];

  const yellowCriteria = [
    "limited toxic ingredients",
    "mixed Scientific evidence",
    "moderate processing or additives",
  ];

  const redCriteria = [
    "multiple harmful ingredients",
    "regulatory warnings",
    "known health risks",
    "substantial processing or additives",
  ];

  ingredients.forEach((ingredient) => {
    if (greenCriteria.includes(ingredient?.toLowerCase())) {
      greenCount++;
    } else if (yellowCriteria.includes(ingredient?.toLowerCase())) {
      yellowCount++;
    } else if (redCriteria.includes(ingredient?.toLowerCase())) {
      redCount++;
    }
  });

  let color;
  let rating;

  if (greenCount > yellowCount && greenCount > redCount) {
    color = "Green";
    rating = 9;
  } else if (yellowCount > greenCount && yellowCount > redCount) {
    color = "Yellow";
    rating =6;
  } else {
    color = "Red";
    rating = 3;
  }

  return { color, rating };
};

module.exports = {evaluateIngredients};
