# Advanced Shell Notes
<!--ts-->
   * [Advanced Shell Notes](#advanced-shell-notes)
      * [Quick References](#quick-references)
         * [Commands Parameters](#commands-parameters)
         * [File Test Operator](#file-test-operator)
         * [Other Comparison Operators](#other-comparison-operators)
            * [Integer Comparison](#integer-comparison)
            * [String Comparison](#string-comparison)
            * [Compound Comparison](#compound-comparison)
         * [Variable Manipulation](#variable-manipulation)
      * [Parentheses, Brackets &amp; Braces!](#parentheses-brackets--braces)
      * [Short on Subshells](#short-on-subshells)
      * [Overview of Bash Symbols](#overview-of-bash-symbols)
         * [$DollarSign](#dollarsign)
         * [( SingleParentheses )](#-singleparentheses-)
         * [(( DoubleParentheses ))](#-doubleparentheses-)
         * [$( DollarSingleParentheses )](#-dollarsingleparentheses-)
         * [$(( DoubleDollarParentheses ))](#-doubledollarparentheses-)
         * [[ SingleSquareBrackets ]](#-singlesquarebrackets-)
         * [[[ DoubleSquareBrackets ]]](#-doublesquarebrackets-)
         * [{SingleCurlyBraces}](#singlecurlybraces)
         * [${DollarBraces}](#dollarbraces)
         * [&lt;( AngleParentheses )](#-angleparentheses-)
         * [&lt;&lt;- 'DOUBLEANGLEHEREDOCS'](#--doubleangleheredocs)
         * [Functions () { ... }](#functions----)
         * [| Pipes](#-pipes)
         * [&lt; Redirection](#-redirection)
         * [&gt; Redirection](#-redirection-1)
         * [. Dot](#-dot)
         * [.. DotDot](#-dotdot)
         * [~ Tilde](#-tilde)
         * [`BackTicks`](#backticks)
      * [Zsh Globbing](#zsh-globbing)

<!-- Added by: user221, at: Thu 30 Jan 2020 10:57:50 PM CET -->

<!--te-->
## Quick References
### Commands Parameters
| Command | Description                                       | 
|---------|---------------------------------------------------|
| `$0`    | Command name                                      | 
| `$1..n` | Parameter 1, 2, 3, 4...n                          | 
| `$-`    | Current options                                   | 
| `$$`    | Process id                                        | 
| `$?`    | Exit status of the most recently executed command`| 
| `"$@"`  | All arguments as separate words                   | 
| `$#`    | Number of arguments                               | 
| `$!`    | PID of most recently backgrounded process         | 

### File Test Operator
<table>
<tr><th>File Test Operators</th><th>Other Comparison Operators</th>
<tr><td>
| Flag | Description 										  |
|----|--------------------------------------------------------------------------------------------|
| -e | File exists										  |
| -a | File exists (identical to -e but is deprecated and outdated) 				  |
| -f | File is a regular file (not a directory or device file) 					  |
| -s | file is not zero size 									  |
| -d | file is a directory 									  |
| -b | file is a block device 									  |
| -c | file is a character device 								  |
| -p | file is a pipe 										  |
| -h | file is a symbolic link									  |
| -L | file is a symbolic link  								  |
| -S | file is a socket  									  |
| -t | file (descriptor) is associated with a terminal device; this test option may be used to check whether the stdin [ -t 0 ] or stdout [ -t 1 ] in a given script is a terminal  |
| -r | file has read permission (for the user running the test)  				  |
| -w | file has write permission (for the user running the test)  				  |
| -x | file has execute permission (for the user running the test) 				  |
| -g | set-group-id (sgid) flag set on file or directory  					  |
| -u | set-user-id (suid) flag set on file.  							  |
| -k | sticky bit set. 										  |
| -O | you are owner of file  									  |
| -G | group-id of file same as yours  								  |
| -N | file modified since it was last read  							  |
| f1 -nt f2 |  file f1 is newer than f2  							  |
| f1 -ot f2 | file f1 is older than f2   							  |
| f1 -ef f2 | files f1 and f2 are hard links to the same file 				  	  |
| !  | "not" -- reverses the sense of the tests above (returns true if condition absent).	  |
</td><td>

| Flag		| Integer Comparison								|
|---------------|-------------------------------------------------------------------------------|
| -eq		|										|
| -ne		|										|
| -gt		|										|
| -ge		|										|
| -lt		|										|
| -le		|										|
| <		|										|
| <=		|										|
| >		|										|
| >=		|										|
| -		|										|
| Flag		| String Comparison								|
|---------------|-------------------------------------------------------------------------------|
| =		|										|
| ==		|										|
| !=		|										|
| <		|										|
| >		|										|
| -z		|										|
| -n		|										|
| Flag		| Compound Comparison								|
|---------------|-------------------------------------------------------------------------------|
| -a		|										|
| -o		|										|
</td></tr> </table>
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

## Overview of Bash Symbols
* `$`
* `( )` is used for running commands in a subshell.
* `$( )` is used for saving output of commands that are send to run in a subshell.
* `(( ))` is used for arithmetic.
* `$(( ))` is used for saving the output of arithmetic.
* `[ ]` is used for testing and is a built-in. Is useful in some cases for filename expansion and string manipulation.
* `[[ ]]` is used for testing. This is the one you should use unless you can think of a reason not to.
* `<( )` Used for process substitution and is similar to a pipe. Can be used whenever a command expects a file and you can use multiple at once.
* `{ }` is used for expansion of sequences
* `${ }` is used for variable interpolation and string manipulation.
* `|` is a pipe which is used for chaining commands together.
* `<`
* `>`
* `<<`
* `>>`
* `.`
* `..`
* `~`
* \`\``

### $DollarSign

### ( SingleParentheses )
*Used for running commands inside a subshell and declaring arrays*

* Examples
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
	1. Strings inside gets considering 'zero'.
	2. This is not valid ~~`a=(( 3 + 4))`~~

### $( DollarSingleParentheses ) 
*Used to retrieve output of commands ran in subshells.*

* Examples
	1. `you_are_here="You working directory is: $( pwd )" ; echo ${you_are_here}`

### $(( DoubleDollarParentheses ))
*Same rules apply as double parentheses without the dollar and in addition you can store the output in varibales.*

* Examples
	1. `you_are_here="You working directory is: $( pwd )" ; echo ${you_are_here}`

### [ SingleSquareBrackets ]
*Used for testing. Alternate version of the built-in `test`.*

* Examples

* Notes
	1. Strings of zero length are `false` and greater than one length (even if its whitespace) is `true`.
	2. `test` and `[` are built-ins, aka. part of the shell language itself aka. programs -- this means that stuff inside is not treated as arguments and thus rendering single square brackets useful for stuff like word splitting or filename expansion.
	3. Has a bunch of gotchas and you're best off sticking to double square brackets, generally.

### [[ DoubleSquareBrackets ]]
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

### <( AngleParentheses )


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

### Functions () { ... }

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

### | Pipes

### < Redirection

### > Redirection

### >> 

### . Dot

### .. DotDot

### ~ Tilde

### \`BackTicks\`
For running commands in a subshell; equivalent to `$( command )` but is deprecated and should not be used. Causes a lot of confusion and gotchas when nesting the backticks which quickly becomes a PITA.

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
