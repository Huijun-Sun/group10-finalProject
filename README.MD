Group-10

Team Members
❖ Anuja Phadnis
❖ Monisha Selvamurugan
❖ Huijun Sun
❖ Han Zheng

GitHub Repository URL: https://github.com/Huijun-Sun/group10-finalProject.git

Study Abroad Planning Application-dreamHigh

To run our application please follow the below steps

1)clear ur database
2)npm run seed to seed the database with sample values for our application to work.We have just seeded the database with 3 user ids for logging in  you can create your own as well.
    In seed.js please run main function 1st by commenting out main1 then comment out main and run again the seed for main1
    main();//Run this function first
    main1();//Run this second since  there is a dependency on 1st function.we need first function databases created before 2nd one atttempts
3)Then give npm start and the applications gets kickstarted

The Major features of our application are as follows and we will demonstrate each of the feature in the video.And all the below features are type checked,handled errors  as well as taken care of edge conditions
1) Main Page
    Main Page will display Trending universities, 
    Search to find universities of interest. 
    It also provides links that navigates to various pages of the website.

2)Guides/Information Doc
    guide to different information related to exams
    GRE IELTS BIA 
    GMAT TOEFL STEM
3)User Details
    Account Creation
    Existing User login
    User profile details is asked Exam,college,course,score
    user details are addded and displayed
    user is allowed to edit the details
    Amd the intrested universities is allowed to add too the user and also we let them add only if that combinationn exists in database and he is let to give status as interested/applied
    And the user can also update the status as admit/reject
    All the details are displayed
4)University Finder
    All the information related to a university is displayed
    The user inputs GRE score,work exp,course,no of papers and match these criteria with university and get back the list
    User can click on the university to view more information
5)past admits/rejects
    course,university and status combination is got from user to retrieve profile matching their input
6)University Deadlines
        When a particular university name ,course and intake is given the deadline of that university is displayed
7)Discussion Forum
        A person can view the on going discussion and corresponding  comments
        If he wants to take part in discussion the user has to login
8)events
    At this page, all the upcoming university admissions/information and events are displayed. 
    The user can navigate to an event and view the detailed information.


Extra features implemented and working are as follows
    1)Upon the addition of a particular university as intrested/applied we categorize the university for the user as safe,moderate,ambitious
    2)Upon the update about status(admit/reject) by the user for a particular university, the other
        student’s info (most recent) who got the admit/reject from the same university is displayed
    3)An email notification (Reminder about deadline) is sent to the user 1 week before and 1 day before



Note:There are were lot of custom CSS so we could not run HTML validate on the appplication.



