function createGradedCheckboxQuestionWithAutofeedback(jsonData) {
  // Make sure the form is a quiz.
  var form = FormApp.getActiveForm();
  form.setIsQuiz(true);
  // Parse the JSON data.
  var data = jsonData;
  // Create a checkbox item for each question in the JSON data.
  data.questions.forEach(function(questionData) {
    var item = form.addCheckboxItem();
    item.setTitle(questionData.question);
    item.setPoints(10);
    // Create a choice for each answer choice in the JSON data.
    var choices = [];
    questionData.options.forEach(function(option, index) {
      var isCorrect = option.correct;
      var choice = item.createChoice(option.text, isCorrect);
      choices.push(choice);
    });
    item.setChoices(choices);
    // Set feedback for the item.
    var explanation = questionData.explanation;
    var correctFeedback = FormApp.createFeedback()
        .setText('Correct! ' + explanation)
        .build();
    item.setFeedbackForCorrect(correctFeedback);
    var incorrectFeedback = FormApp.createFeedback()
        .setText('Incorrect. ' + explanation)
        .build();
    item.setFeedbackForIncorrect(incorrectFeedback);
  });
}
