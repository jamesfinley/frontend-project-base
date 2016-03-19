module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/assets/js/*.js'],
        dest: 'build/assets/js/<%= pkg.name %>.js'
	  }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    sass: {
      dist: {
      	options: {
      	  style: 'compressed'
      	},
        files: [{
          expand: true,
          cwd: 'src/assets/css/',
          src: ['*.scss', '!_*.scss'],
          dest: 'build/assets/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['src/assets/js/*.js', 'src/assets/css/*.scss'],
      task: ['concat', 'uglify', 'sass']
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass']);

};
