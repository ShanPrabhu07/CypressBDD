Feature: Login Functionality

  Scenario: Successful login with valid credentials

    Given Open the browser and navigate to qa.scriptureforge.org
    When Click the "Login" button
    Then Click on the "Login with Paratext" on the login page
    When Enter the Paratext admin credentials and click "Login"
    Then  Verify that the admin user is logged in successfully.
    When Verify that the user lands on the "My Projects" page upon successful login.
    Then   Click "Connect" on the project "Project SIL".
    When Verify that the user is redirected to the "Connect Paratext Project" page.
    Then  Select the DBL resource (“EASY - Easy English Bible 2018”) as the Source project.
    When Verify that the "Community Checking" checkbox is checked.
    Then  Click on the “Connect” button
    When  Verify that the project is connected successfully
    Then   Click on Settings page
    When   Check the Translation Suggestions check box
    Then   Verify that the Translation suggestions enable for the project
    When    Click on the Questions & Answers
    Then    Click on “Add Questions” button
    When   Select the book “Ruth”, chapter 1, and 4th verse from the drop-down
    Then   Add a text question (“Question 1”)
    When  Click on the Save button
    Then   Add 2 more questions (“Question 2 and Question 3”) on the same book, same chapter and same verse (i.e. RUT 1:4)
    When  Verify that the 3 sets of questions are sorted in the canonical order (based on the order of creation)
    Then   Click on the Add Questions button
    When   Verify that the Add questions dialog appears
    Then   Add a question (“Question 4”) on the 5th verse of the book “Ruth” (i.e. RUT 1:5)
    When Verify that the added question appears below the previous questions in the canonical order (i.e. at the bottom of list)
    Then  Click on the Add Questions button
    When  Add a text question (“Question 5”) on the 4th verse (i.e. RUT 1:4)
    Then  Verify that the newly created question is added before the previously created question (i.e. last but one) and appeared below the three questions on the same verse

