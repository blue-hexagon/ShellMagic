# Advanced Shell Notes{: #top-entry}
## Variable Manipulation{: #variable-manipulation}
```bash
${parameter:-defaultValue}              # Get default shell variables value                     
${parameter:=defaultValue}              # Set default shell variables value                     
${parameter:?"Error Message"}           # Display an error message if parameter is not set      
${#var}                                 # Find the length of the string                         
${var%pattern}                          # Remove from shortest rear (end) pattern               
${var%%pattern}                         # Remove from longest rear (end) pattern                
${var:num1:num2}                        # Substring                                             
${var#pattern}                          # Remove from shortest front pattern                    
${var##pattern}                         # Remove from longest front pattern                     
${var/pattern/string}                   # Find and replace (only replace first occurrence)      
${var//pattern/string}                  # Find and replace all occurrences
${!prefix*}                             # Expands to the names of variables whose names begin with prefix.
${var,} OR ${var,pattern}    		# Convert first character to lowercase.                 
${var,,} OR ${var,,pattern}  		# Convert all characters to lowercase.                  
${var^} OR ${var^pattern}   		# Convert first character to uppercase.                 
${var^^} OR ${var^^pattern}  		# Convert all character to uppercase.
```
## Short on Subshells{: #subshells}
If you invoke the *exit* in a subshell, it will not pass variables to the parent. Use `{` and `}` instead of `(` and `)` if you do not want Bash to fork a subshell.
See the info pages for Bash for more information on pattern matching with the `(( EXPRESSION ))` and `[[ EXPRESSION ]]` constructs. - [TLDR](https://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_01.html)

## Zsh Globbing{: #globbing}
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
