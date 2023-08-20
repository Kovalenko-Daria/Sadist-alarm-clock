# Sadist-alarm-clock

## About
Sadist alarm clock is a web application that provides a better wake-up compared to classical analogues thanks to the advanced functionality in the form of disabling the sound signal after solving the task proposed when waking up. The software product also allows user to choose a melody, provides motivational support and gives opportunity to track statistics of waking up in personal account.
***

## Interfaces
* _Login window_
After launch of the application, the first window user sees is this one. There is a name of the application on top, below - the inscription “Authorization”, fields for entering login and password, the “Log in” button, as well as the “Register” button in case the user doesn't have an account yet. When user clicks on the button “Register”, a “Registration window” opens.
In case of incorrect data entry, an inscription “Invalid username or password. Try again.” appears on the screen. If user enters unsuitable login data, for example, login less than 3 or more than 20 characters, then a message about incorrect data appears. Upon successful login to the account, an “Alarm clock window” opens.

* _Registration window_
There is a name of the application on top, below - the inscription “Registration”, fields for entering name, email, username and password, as well as the “Register” button.
For users who needs to return to the “Login window”, there is an inscription at the bottom “Are you already registered?” with the “Login” button, which will open the authorization page after click.
After successful registration, an “Alarm clock window” opens.

* _Alarm clock window_
On this page user sees his alarms, which displays the time and date for which they were set. On the right of each record of alarm clock there is a button in the form of a cross to delete it. In the right upper corner there is a button in the form of plus, which leads to “Window for adding an alarm clock”. In the left upper corner there is a button in the form of a house, which leads to “Profile window”.

* _Window for adding an alarm clock_
In the window for adding an alarm clock there is an inscription “Alarm clock” on top, button “Save” to set this
alarm and “Cancel” to delete it at the bottom. In the middle part of the window user sees two fields for setting the date and time as well as drop-down lists “Alarm melody”, “Task type” (options “Mathematical“ and ”Logical"),
“Complexity" (options “Easy” and “Difficult”).
After setting up all the characteristics and clicking the “Save” button, “Alarm clock window” opens, where a new alarm clock will be displayed. After clicking the “Cancel” button, a window with alarms will also open, but without a new alarm clock.

* _Profile window_
There is an inscription “Profile” on top, below - the user name, statistics (the average amount of time spent on all
tasks, the total number of solved tasks and the percentage of solved tasks) and the “Log out” button, after clicking which “Login window” appears. The button in the form of an arrow in the upper left corner returns to the “Alarm clock window”.

* _Window with working alarm_
The window appears at a specific time and a specific day that the user has chosen. The time is displayed on top. In the middle of the window there is an inscription “Alarm clock” and a button “Solve the problem”, which leads to “Task window”.

* _Task window_
A rectangle appears on the screen with the inscription “Choose an answer”, the text of the task and buttons with answer options, among which only one is correct. When user clicks on an incorrect answer, the task text and answer options change accordingly. If the answer is correct, a “Pop-up window with a motivational phrase” appears.

* _Pop-up window with a motivational phrase_
After successful solving of the problem, user sees a rectangle, inside of which there is an information about the time spent on the answer, as well as a motivational phrase for the day. There is a button “OK” at the bottom, which closes the pop-up window and returns user to “Alarm clock window”.

***

## Functionality
1. The user can register in the application by entering a name, email address, login and password

2. To log in to the application, user needs to enter username and password

3. If the data is entered incorrectly, the message “Invalid login or password. Try again” is displayed

4. To set an alarm, user has to click on the add alarm button

5. The user can set an alarm and specify the following parameters:
    * Time
    * Date
    * A melody from the list
    * Type of task (mathematical and logical tasks are possible)
    * Complexity of the task (simple or complex)
    
6. The user can delete the alarm before the bell rings

7. Tasks can be mathematical and logical
    * Math problems should be at the level of 6-7 grade or simpler, an example of problems: https://blog.zabedu.ru/matem/wpcontent/uploads/sites/10/2015/04/книга1.pdf
    * Logical tasks should be of medium difficulty, example of tasks: https://azbyka.ru/deti/logicheskie-i-zanimatelnye-zadachi
    
8. The user can select a melody from the list

9. At the time of alarm, a “Window with working alarm” opens in front of the user with the alarm time and the “Solve
the problem” button, the selected melody plays. If the user has not pressed the button within 15 seconds, then the melody changes to a random composition of the group “Korol i Shut”

10. After clicking the “Solve the problem” button, a screen with a task and 4 answer options appears in front of the user, and a calm melody starts playing again. If within 15 seconds the user does not solve the problem correctly, then the melody changes to a random composition of group “Korol i Shut”

11. To select an answer, the user must click on one of the suggested answer options

12. If the problem is solved incorrectly, the user is offered another task with answer options

13. The alarm clock rings until the task is solved correctly

14. After successful solving of the problem the amount of time spent on the solution and a random motivating phrase appears in the pop-up window

15. User can go to the profile and see the statistics: the average time spent on all tasks, the total amount of solved tasks and the percentage of correctly solved tasks