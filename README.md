# Advanced Shell Notes

## Commands
Below a descriptional table which takes outline in the following command **Hello World!**: `$(zsh --exec "echo hello world")` (we only invoke a subshell to illustrate we are working in zsh). Now, from then on zsh will store some shell variables which are based on the command previously invoked, read on below.

| Command | Desc.                                             | Example Command     | Example Output              |
|---------|---------------------------------------------------|---------------------|-----------------------------|
| `$0`    | Command name                                      | `$ `                |`> zsh`                      |
| `$-`    | Current options                                   | `$ `                |`> 035679BCDEJNOPRXYZgiks`   |
| `$$`    | Process id                                        | `$ `                |`> 4667`                     |
| `$?`    | Exit status of the most recently executed command`| `$ `                |`> 0`                        |
| `"$@"`  | All arguments as separate words .                 | `$ `                |`> Hello World!`             |
| `$#`    | Number of arguments                               | `$                  |`> 2`                        |
| `$!`    | PID of most recently backgrounded process         | `$ bash& ; echo "$\!"`|`> 17454`                  |
                        

## Variable Manipulation
|Pattern | Description|
|--------|:-----------|
|<kbd>${parameter:-defaultValue}</kbd>              | Get default shell variables value                     |
|<kbd>${parameter:=defaultValue}</kbd>              | Set default shell variables value                     |
|<kbd>${parameter:?"Error Message"}</kbd>           | Display an error message if parameter is not set      |
|<kbd>${#var}</kbd>                                 | Find the length of the string                         |
|<kbd>${var%pattern}</kbd>                          | Remove from shortest rear (end) pattern               |
|<kbd>${var%%pattern}</kbd>                         | Remove from longest rear (end) pattern                |
|<kbd>${var:num1:num2}</kbd>                        | Substring                                             |
|<kbd>${var#pattern}</kbd>                          | Remove from shortest front pattern                    |
|<kbd>${var##pattern}</kbd>                         | Remove from longest front pattern                     |
|<kbd>${var/pattern/string}</kbd>                   | Find and replace (only replace first occurrence)      |
|<kbd>${var//pattern/string}</kbd>                  | Find and replace all occurrences|
|<kbd>${!prefix*}</kbd>                             | Expands to the names of variables whose names begin with prefix.|
|<kbd>${var,}</kbd><br><kbd>${var,pattern}</kbd>    | Convert first character to lowercase.                 |
|<kbd>${var,,}</kbd><br><kbd>${var,,pattern}</kbd>  | Convert all characters to lowercase.                  |
|<kbd>${var^}</kbd><br><kbd>${var^pattern}</kbd>    | Convert first character to uppercase.                 |
|<kbd>${var^^}</kbd><br><kbd>${var^^pattern}</kbd>  | Convert all character to uppercase.                   |

## Short on Subshells
If you invoke the *exit* in a subshell, it will not pass variables to the parent. Use `{` and `}` instead of `(` and `)` if you do not want Bash to fork a subshell.

## Parentheses, Brackets & Braces!
I will explain all the various rules of braces, brackets and parentheses in the following section. I will provide short examples and important notes on the use and misuse of these symbols.

### Single Parenthese ( )
*Used for running commands inside a subshell and declaring arrays*

#### Examples
1. `( echo "Hello" ; variable="This variable resides in this subshell ; echo "\n") ; echo ${variable}`
2. `colors=(green yellow purple gray black white magenta)`
3. `coordinates=('16.491838, 28.164997' '-55.594198, -13.051657' '-94.274509, 42.953203')`

#### Notes
1. Bash uses the enviromental variable `$IFS` to determine the delimiter which by default is set to whitespace.

### Double Parentheses: (( ))
*Used for integer arithmetic and modifying variables. HOWEVER, you it does not output any variables!! Variables modified inside the parentheses will stick however.*

#### Examples
`i=4 ; (( i += 4 )) ; echo "${i}"` will output `8`.

#### Notes
1. Note: Strings inside gets considering 'zero'.
2. Note: This is not valid ~~`a=(( 3 + 4))`~~

### Dollar Single Parentheses $( ) 
*Used to retrieve output of commands ran in subshells.*

#### Examples
1. `you_are_here="You working directory is: $( pwd )" ; echo ${you_are_here}`

#### Notes

### Double Dollar Parentheses $(( ))
*Same rules apply as double parentheses without the dollar and in addition you can store the output in varibales.*

### Single Square Brackets [ ]
*Used for testing. Alternate version of the built-in `test`.*
1. Strings of zero length are `false` and greater than one length (even if its whitespace) is `true`.
2. `test` and `[` are built-ins, aka. part of the shell language itself aka. programs -- this means that stuff inside is not treated as arguments and thus rendering single square brackets useful for stuff like word splitting or filename expansion.
3. Has a bunch of gotchas and you're best off sticking to double square brackets, generally.

### Double Square Brackets [[ ]]
*Supports extended regex.*

1. You may use quotes around the second argument to force a raw, instead of a regex match.

### Single Curly Braces { }
*Used for expansion.*
1. `a{bsenti,cademi,lgebr,mmoni,mnesi}a` expands into `absentia academia algebra ammonia amnesia`
2. You can also do sequences `printf "%s " {a..f}{0..9}` will print all the 2-digit base-16 numbers.

### Dollar Braces ${ }

### Angle Parenthteses <( )

### Double Angle Heredocs <<

### Functions
```bash
function hello() {
	echo "Hi $1"
}

hello() {
	echo "Hi $1"
}

function hello {
	echo "Hi $1"
}
```
* Q: What's the difference between the three examples above?
* A: None, what-so-ever.... :)

## Zsh Globbing
> Globbing is done to filenames by the shell, and regex is used for searching text. [Globbing and regex, so similar yet so different](https://www.linuxjournal.com/content/globbing-and-regex-so-similar-so-different)

**Always use quotes in your regex to avoid globbing**

I recommend you read the quoted article above if you are still confused about any basic difference regards the two.

Now that we have the basics down, lets get to the good stuff.

```shell
    /      directories
    .      plain files
    @      symbolic links
    =      sockets
    p      named pipes (FIFOs)
    *      executable plain files (0100)
    %      device files (character or block special)
    %b     block special files
    %c     character special files
    r      owner-readable files (0400)
    w      owner-writable files (0200)
    x      owner-executable files (0100)
    A      group-readable files (0040)
    I      group-writable files (0020)
    E      group-executable files (0010)
    R      world-readable files (0004)
    W      world-writable files (0002)
    X      world-executable files (0001)
    s      setuid files (04000)
    S      setgid files (02000)
    t      files with the sticky bit (01000)
    
  print *(m-1)                      # Files modified up to a day ago
  print *(a1)                       # Files accessed a day ago
  print *(@)                        # Just symlinks
  print *(Lk+50)                    # Files bigger than 50 kilobytes
  print *(Lk-50)                    # Files smaller than 50 kilobytes
  print **/*.c                      # All *.c files recursively starting in $PWD
  print **/*.c~file.c               # Same as above, but excluding 'file.c'
  print (foo|bar).*                 # Files starting with 'foo' or 'bar'
  print *~*.*                       # All Files that do not contain a dot
  chmod 644 *(.^x)                  # make all plain non-executable files publically readable
  print -l *(.c|.h)                 # Lists *.c and *.h
  print **/*(g:users:)              # Recursively match all files that are owned by group 'users'
  echo /proc/*/cwd(:h:t:s/self//)   # Analogous to >ps ax | awk '{print }'<
```
