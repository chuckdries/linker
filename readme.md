# Stop emailing yourself links

Linker is dead simple: POST it a single piece of information and will give you that information back via GET request.

I made it when I was trying to fix the graphics drivers on my Fedora partition on my desktop. I had a step by step instruction blog post open on my laptop and I was typing the code from my laptop into my desktop one line at a time when I wished I could just copy paste between computer without installing anything or signing up for some service or any of that nonsense. So, in my laziness, linker was born, so I could quickly send small snippets of text from one computer to another. I wrote a script that POSTed its arguments to the linker URL (which is always the same) then I just cURL that url on my recieving machine to retrieve my contents.

### Usage:

Make sure there is a file in your node folder called `password` that looks something like this:  

    module.exports="<yourpassword>"

The linker payload is a JSON object literal with three attributes:
    - `content` is the content to be sent (string)
    - `password` is the password defined in the password file
    - `type` set to `url` to have the service return a tiny HTML page that redirects your browser to the url in content. Omit to have service return the text in `content` and nothing else.

I have three very short bash scripts I can easily recreate on any vm or remote machine or whatever wherever I need it. No installation necessary.

#### "copying" / uploading
    curl --data "{\"content\":\"$1\",\"password\":\"<yourpassword>\"}" <linkerurl>
    echo ""

#### uploading URLs 
    curl --data "{\"content\":\"$1\",\"type\":\"url\",\"password\":\"<yourpassword>\"}" <linkerurl>
    echo ""
#### "pasting" / uploading
    curl <linkerurl> && echo "" 

If you're piping the output to something else, feel free to remove the `&& echo ""` to get rid of the new line in the output. I just think it's pretty.

In theory this service is 100% compatible with any platform that can connect to the internet. I don't know batch or powershell but porting these scripts to windows would be completely trivial if I bothered to try. If you do, please submit a pull request!

## Password

As you can see, your password is stored in plain text and transmitted in plain text every time you post a new request. Obviously this is not secure. DO NOT use a password that you care about. Maybe pick a favorite fruit or something.

## The Future

Right now, I'm hosting my own copy on DigitalOcean. I plan on adding the ability to put multiple payloads (with different passwords) at different url paths, so potentially one install could be opened up to the public with some sort of simple registration system, kinda like txti or pastebin but simpler to use from the command line.