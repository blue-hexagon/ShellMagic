# Advanced Shell Notes
> Globbing is done to filenames by the shell, and regex is used for searching text. [Globbing and regex, so similar yet so different](https://www.linuxjournal.com/content/globbing-and-regex-so-similar-so-different)

I recommend you read the quoted article above if you are still confused about any basic difference regards the two.

## Commands
The following descriptional table will take outline in the following command which invokes a zsh subshell (that it is a subshell is not important, but it is spawned from within a shell, unavoidably:
~$(zsh --exec "echo hello world")~

| Command | Desc.                                             | Example Command     | Example Output              |
|---------|---------------------------------------------------|---------------------|-----------------------------|
| `$0`    | Command name                                      | `$ `                |`> zsh`                      |
| `$-`    | Current options                                   | `$ `                |`> 035679BCDEJNOPRXYZgiks`   |
| `$$`    | Process id                                        | `$ `                |`> 4667`                     |
| `$?`    | Exit status of the most recently executed command`| `$ `                |`> 0`                        |
| `"$@"`  | Array expansion: All arguments as separate words .| `$ `                |`> Hello World!`             |
| `$#`    | Number of arguments                               | `$ `                |`> lala`                     |
                        

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
See the info pages for Bash for more information on pattern matching with the `(( EXPRESSION ))` and `[[ EXPRESSION ]]` constructs. - [TLDR](https://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_01.html)

## Zsh Globbing
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
