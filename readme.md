# Linker 

## cloud copy-paste for devs and sysadmins.

Linker is dead simple. Send it a single piece of information via POST and will give you that exact information via GET.

### Usage:

Make sure there is a file in your node folder called `password` that looks something like this:  

    module.exports="yourpasswordhere"

The linker payload is a JSON object literal with three attributes:
    - `content` is the content to be sent (string)
    - `password` is the password defined in the password file
    - `type` set to `url` to have the service return a tiny HTML page that redirects your browser to the url in content. Omit to have service return the text in `content` and nothing else.

I have three very short bash scripts I can easily recreate on any vm or remote machine or whatever wherever I need it

#### "copying" uploading
    curl --data "{\"content\":\"$1\",\"password\":\"<yourpassword>\"}" <linkerurl>/                                                                 
    echo ""

#### uploading URLs 
    curl --data "{\"content\":\"$1\",\"type\":\"url\",\"password\":\"<yourpassword>\"}" <linkerurl>/                                                                 
    echo ""
#### "pasting" (downloading)
    curl <linkerurl> && echo "" 

## Password

As you can see, your password is stored in plain text and transmitted in plain text every time you post a new request. Obviously this is not secure. DO NOT use a password that you care about. Maybe pick a favorite fruit or something.

## The Future

Right now, I'm hosting my own copy on DigitalOcean. I plan on adding the ability to put multiple payloads (with different passwords) at different url paths, so potentially one install could be opened up to the public with some sort of simple registration system, kinda like txti or pastebin but simpler to use from the command line.