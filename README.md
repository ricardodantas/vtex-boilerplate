Vtex Boilerplate
===============

PT_BR: Estrutura para desenvolvimento rápido de lojas para a  plataforma de e-commerce Vtex.

ENGLISH: A scaffold to rapid development for Vtex e-commerce platform.

***


## Structure:

- **src/**: The main source files. **Never upload the files under this folder.**

    - **assets/**: All the scss, css, javascript, coffeescript and image files must be stored here.
	    -  **css/**: Non compiled css, usually for the legacy files.
	   	- **coffeescript/**: Compile with Coffeescript/Grunt.
	    -  **scss/**: The scss files which will be compiled by Compass/Grunt.
	    	- ** vtex/**: Vtex generated styles.
	    	- **custom/**:Yout custom styles, which should be included in the other files.
	    	- **config/**: The config files for your custom and "x-.." files.
	    - **img/**: Image files.
	    - **js/**: Non compiled javascript, usually for the legacy files.
	    	
	    
    - **subtemplates/**: All the parts to be included in the templates must be stored here. 
    - **templates/**: All the main templates must be stored here. 
    - **Gruntfile.js**: The automated script to compile, compress and optimize all files. **If needed, be careful to touch on this file!**
    
***

- **build/**: This is a generated folder by Grunt and these are the file which should be used to deploy (uploaded to server).

