# bash-notes

Pattern | Description
------------|------------
<kbd>${parameter:-defaultValue}</kbd> | Get default shell variables value
<kbd>${parameter:=defaultValue}</kbd> | Set default shell variables value
<kbd>${parameter:?"Error Message"}</kbd> | Display an error message if parameter is not set
<kbd>${#var}</kbd> | Find the length of the string
<kbd>${var%pattern}</kbd> | Remove from shortest rear (end) pattern
<kbd>${var%%pattern}</kbd> | Remove from longest rear (end) pattern
<kbd>${var:num1:num2}</kbd> | Substring
<kbd>${var#pattern}</kbd> | Remove from shortest front pattern<br>
<kbd>${var##pattern}</kbd> | Remove from longest front pattern<br>
<kbd>${var/pattern/string}</kbd> | Find and replace (only replace first occurrence)
<kbd>${var//pattern/string}</kbd> | Find and replace all occurrences
<kbd>${!prefix*}</kbd> | Expands to the names of variables whose names begin with prefix.
<kbd>${var,}</kbd><br><kbd>${var,pattern}</kbd> | Convert first character to lowercase.
<kbd>${var,,}</kbd><br><kbd>${var,,pattern}</kbd> | Convert all characters to lowercase.
<kbd>${var^}</kbd><br><kbd>${var^pattern}</kbd> | Convert first character to uppercase.
<kbd>${var^^}</kbd><br><kbd>${var^^pattern}</kbd> | Convert all character to uppercase.
	
If you invoke the *exit* in a subshell, it will not pass variables to the parent. Use `{` and `}` instead of `(` and `)` if you do not want Bash to fork a subshell.
