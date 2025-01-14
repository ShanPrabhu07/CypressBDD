Feature: Login Functionality

  Scenario: Successful login with valid credentials

    Given Open the browser and navigate to qa.scriptureforge.org
    When Click the "Login" button
    Then Click on the "Login with Paratext" on the login page
    When Enter the Paratext admin credentials and click "Login"
    Then Verify that the admin user is logged in successfully
    When Verify that the user lands on the "My Projects" page upon successful login
    Then  Click "Connect" on the project "Project SIL"
    When  Verify that the project is connected successfully
    Then   Click on Settings page
    When   Check the Translation Suggestions check box
    Then   Verify that the Translation suggestions enable for the project
    When    Click on the Questions & Answers
    Then    Click on “Add Questions” button
    When   Select the book “Ruth”, chapter 1, and 4th verse from the drop-down
    Then   Add a text question Question 1
    When  Click on the Save button
    Then  Add two more questions on the same book, same chapter and same verse
    When  Verify that the 3 sets of questions are sorted in the canonical order
    Then   Click on the Add Questions button again
    When   Verify that the Add questions dialog appears
    Then   Add a Question 4 on the 5th verse of the book Ruth
    When Verify that the added question appears below the previous questions in the canonical order
    Then  Click on the Add Questions button for final question
    When  Add a text Question 5 on the 4th verse 
    Then  Verify that the newly created question is added before the previously created question and appeared below the three questions on the same verse

