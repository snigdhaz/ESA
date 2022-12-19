/*
 *  * dir_proc.c: remote readdir implementation
 *   */
#include <rpc/rpc.h>            /* Always needed */
#include <sys/dir.h>
#include "dir.h"                /* Created by rpcgen */
#include <errno.h>
//extern int errno;
//extern char *malloc();

extern char *strdup();
FILE *popen(const char *command, const char *mode);
int pclose(FILE *stream);
readdir_res *

readdir_1_svc(nametype *dirname, struct svc_req *req)
{
	        //nametype *dirname;
	namelist nl;
	namelist *nlp;
	static readdir_res res; /* must be static! */
	FILE *command;
  char result[1024];

 
	char* cmd_find = (char*) malloc(strlen("ls ") + strlen(*dirname) + 1);
	strcpy(cmd_find, "find ");
	strcat(cmd_find, *dirname);
  command = popen(cmd_find, "r");
  
  
	if (command == NULL) 
	{
		printf("%s\n", cmd_find);
		res.errnum = errno;
		return (&res);
	}

	else 
	{
		nlp = &res.readdir_res_u.list;
		while (fgets(result, sizeof(result), command)) {
			nl = *nlp = (namenode *) malloc(sizeof(namenode));
			nl->name = strdup(result);
			nlp = &nl->next;
		}
		*nlp = NULL;
		
		printf("find command!\n");
		/*
		*          * Return the result
		*                   */
		
		res.errnum = 0;
		pclose(command);
		return (&res);
	}
}	      
						 
						     
								      
										
