{
    "task_table" [
        "task_id integer PRIMARY KEY", 
        "task_name text NOT NULL", 
        "task_desc text NOT NULL", 
        "task_eta integer NOT NULL", 
        "task_files blob", 
        "task_statuschanges blob NOT NULL", 
        "task_assigneddate integer NOT NULL", 
        "task_comments text"
    ],
    "team_table" [
        "task_id integer NOT NULL UNIQUE", 
        "task_name text NOT NULL", 
        "task_createdon integer NOT NULL", 
        "task_status text NOT NULL", 
        "task_projectname text NOT NULL", 
        "task_assigneename text NOT NULL", 
        "task_assigneeid integer", 
        "task_assignedtoname text NOT NULL", 
        "task_assignedtoid integer"
    ]
}