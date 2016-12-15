var snippets = {
	"Python" : '$ sudo pip3 install coala-bears\n' +
				'$',

    "C++"	 :  '\
$ sudo pip3 install coala-bears\n\
$ cat sum.cpp\n\
return a + b;\n\
$ coala --files "**.cpp" --bears CPPBear --save\n\
$ coala' 	
}