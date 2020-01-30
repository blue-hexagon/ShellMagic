# Advanced Shell Notes
<!--ts-->
   * [Advanced Shell Notes](#advanced-shell-notes)
      * [Quick References](#quick-references)
         * [Commands Parameters](#commands-parameters)
         * [Variable Manipulation](#variable-manipulation)
      * [Parentheses, Brackets &amp; Braces!](#parentheses-brackets--braces)
      * [Short on Subshells](#short-on-subshells)
      * [Quick Overview](#quick-overview)
         * [Single Parentheses ( )](#single-parentheses--)
            * [Examples](#examples)
            * [Notes](#notes)
         * [Double Parentheses: (( ))](#double-parentheses--)
            * [Examples](#examples-1)
            * [Notes](#notes-1)
         * [Dollar Single Parentheses $( )](#dollar-single-parentheses--)
            * [Examples](#examples-2)
         * [Double Dollar Parentheses $(( ))](#double-dollar-parentheses--)
            * [Examples](#examples-3)
         * [Single Square Brackets [ ]](#single-square-brackets--)
            * [Examples](#examples-4)
            * [Notes](#notes-2)
         * [Double Square Brackets [[ ]]](#double-square-brackets--)
            * [Examples](#examples-5)
            * [Notes](#notes-3)
         * [Single Curly Braces { }](#single-curly-braces--)
            * [Examples](#examples-6)
            * [Notes](#notes-4)
         * [Dollar Braces ${ }](#dollar-braces--)
            * [Examples](#examples-7)
            * [Gotchas](#gotchas)
         * [Angle Parenthteses &lt;( )](#angle-parenthteses--)
            * [Examples](#examples-8)
            * [Notes](#notes-5)
         * [Double Angle Heredocs &lt;&lt;](#double-angle-heredocs-)
            * [Examples](#examples-9)
            * [Notes](#notes-6)
         * [Functions](#functions)
            * [Examples](#examples-10)
      * [Zsh Globbing](#zsh-globbing)

<!-- Added by: user221, at: Thu 30 Jan 2020 05:24:13 PM CET -->

<!--te-->
## Quick References
### Commands Parameters
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
                        
### Variable Manipulation
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

## Parentheses, Brackets & Braces!
I will explain all the various rules of braces, brackets and parentheses in the following section. I will provide short examples and important notes on the use and misuse of these symbols.

## Short on Subshells
If you invoke the *exit* in a subshell, it will not pass variables to the parent. Use `{` and `}` instead of `(` and `)` if you do not want Bash to fork a subshell.

## Quick Overview
* `( )` is used for running commands in a subshell.
* `$( )` is used for saving output of commands that are send to run in a subshell.
* `(( ))` is used for arithmetic.
* `$(( ))` is used for saving the output of arithmetic.
* `[ ]` is used for testing and is a built-in. Is useful in some cases for filename expansion and string manipulation.
* `[[ ]]` is used for testing. This is the one you should use unless you can think of a reason not to.
* `<( )` Used for process substitution and is similar to a pipe. Can be used whenever a command expects a file and you can use multiple at once.
* `{ }` is used for expansion of sequences
* `${ }` is used for variable interpolation and string manipulation.

### ( SingleParentheses )
*Used for running commands inside a subshell and declaring arrays*

#### Examples
1. `( echo "Hello" ; variable="This variable resides in this subshell ; echo "\n") ; echo ${variable}`
2. `colors=(green yellow purple gray black white magenta)`
3. `coordinates=('16.491838, 28.164997' '-55.594198, -13.051657' '-94.274509, 42.953203')`

* Notes
	1. Bash uses the enviromental variable `$IFS` to determine the delimiter which by default is set to whitespace.

### (( DoubleParentheses ))
*Used for integer arithmetic and modifying variables. HOWEVER, will not output any variables!! Variables modified inside the parentheses will stick however.*

* Examples
	1. `i=4 ; (( i += 4 )) ; echo "${i}"` will output `8`.

* Notes
	1. Note: Strings inside gets considering 'zero'.
	2. Note: This is not valid ~~`a=(( 3 + 4))`~~

### $( Dollar Single Parentheses ) 
*Used to retrieve output of commands ran in subshells.*

* Examples
	1. `you_are_here="You working directory is: $( pwd )" ; echo ${you_are_here}`

### $(( Double Dollar Parentheses ))
*Same rules apply as double parentheses without the dollar and in addition you can store the output in varibales.*

* Examples
	1. `you_are_here="You working directory is: $( pwd )" ; echo ${you_are_here}`

### [ Single Square Brackets ]
*Used for testing. Alternate version of the built-in `test`.*

* Examples

* Notes
	1. Strings of zero length are `false` and greater than one length (even if its whitespace) is `true`.
	2. `test` and `[` are built-ins, aka. part of the shell language itself aka. programs -- this means that stuff inside is not treated as arguments and thus rendering single square brackets useful for stuff like word splitting or filename expansion.
	3. Has a bunch of gotchas and you're best off sticking to double square brackets, generally.

### [[ Double Square Brackets ]]
*Used for testing and supports extended regex but isn't a shell built-in.*

* Examples


* Notes
	1. You may use quotes around the second argument to force a raw, instead of a regex match.

### {SingleCurlyBraces}
*Used for expansion of sequences.*

* Examples
	1. `a{bsenti,cademi,lgebr,mmoni,mnesi}a` expands into `absentia academia algebra ammonia amnesia`
	2. You can also do sequences `printf "%s " {a..f}{0..9}` will print a bunch of hex numbers.
	3. `echo {z..a..2}` will print every second letter starting from `z` and working backwards toward `a`.
	4. To save all 2-letter permutations of the alphabet to an array: `letter_combos=({a..z}{a..z})` boom!

* Notes

### ${DollarBraces}
*Use to manipulate variables or when normal string interpolation could get weird.*

* Examples
*When string interpolation could get weird*
``
See: [Variable manipulation](#Variable-Manipulation) for examples on that.

* Gotchas
1. No spaces around the content/variables.

### <( AngleParenthteses )


* Examples


* Notes


### <<- 'DOUBLEANGLEHEREDOCS' 
*A "here document" is a special-purpose codeblock that uses a form of I/O redirection to feed a command list to an interactive program like f.e. cat, ftp, sed, awk, wc, shuf and many more.*
* Examples
```bash
cat << 'THEEND'
It never ceases to amaze me :O
we all love ourselves <3 more than other people,
but care more about their opinions [OH NO!] than our own.
	- Marcus Aurelius  &"&!(£"*_*str4n3__SYMBOLS!
THEEND

```
> It never ceases to amaze me :O
> we all love ourselves <3 more than other people,
> but care more about their opinions [OH NO!] than our own.
> 	- Marcus Aurelius  &"&!(£"*_*str4n3__SYMBOLS!

A more useful example would be to use sed for removing all symbols, say you want to create an array with all words for example. We can replace `cat ` with `sed 's/[^[:alpha:]]/ /gi'` which removes all symbols.

* Notes
There exists a couple of variations and rules to the heredoc.
1. To suppres leading tabs on any lines, use `<<-` (dash at the end).
2. You may quote, or chose not to quote your "magic word", i.e. THEEND.
3. Your magic word can be more or less anything you chose.

### Functions

* Examples
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
