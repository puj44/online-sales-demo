# Technologies used
React, HTML, CSS, react-toastify, react-router-dom

# Storage
Used Session storage to store forms json for user

Run 
> npm i 
to install dependencies and then
> npm start
to run the project

# Description

Homepage: 
+ Displays list of all user's forms which can be edited or tested for validation.
+ "+ Create New Form" button redirects to another page to generate a new form.

Create/Edit New Form:
+ User can create or edit the form and upon saving, it is converted to a structural JSON format data and stored in browser session storage.
+ Displays list of current added fields of the form which can be edited or removed.
+ Field Add/Edit Modal:
  > Label(Name of the field to display), 
  > Field (various input field types such as input, textarea, file etc), 
  > Type (for input field), Min & Max(for input field and textarea),
  > Options ( for group fields(dropdown,radio,checkbox: written in comma seperated format for eg. Value1,Value2),
  > Is Required(Mandatory or not),
  > Display When(Optional: Must exist group fields such as dropdown, radio etc. to select 
  the field and its value to display such field).
+ JSON will look something like this:
 ```
{
    "user-form":{ // form name as key for accessing 
      "formName":"User Form", //Form Name
      "formFields":[ // array of fields of the form
           {
            "label": "Gender*",
            "field": "radiobutton",
            "options": "Male,Female",
            "required": "yes",
            "fieldName": "gender*"
          }
      ]
    }
}
```

Test Form:
+ Using the JSON Above, a dynamic form is displayed and can be tested for validation.
+ If the validation passes, user will be redirected to home page otherwise a toast message will show all the specific validation errors of each field.

