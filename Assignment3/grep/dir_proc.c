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
	        //nametype *dirname;
{

	FILE *cmd;
    char result[1024];
	namelist nl;
	namelist *nlp;
	static readdir_res res; /* must be static! */

	char* cmdd = (char*) malloc(strlen("ls ") + strlen(*dirname) + 1);
	strcpy(cmdd, "grep -ni ");
	strcat(cmdd, *dirname);
	strcat(cmdd, " ./*");
    cmd = popen(cmdd, "r");
	if (cmd == NULL) {
		printf("%s\n", cmdd);
		res.errnum = errno;
		return (&res);
	}

	/*
	*          * Free previous result
	*                   */
	//xdr_free(xdr_readdir_res, &res);

	nlp = &res.readdir_res_u.list;
	while (fgets(result, sizeof(result), cmd)) {
		nl = *nlp = (namenode *) malloc(sizeof(namenode));
		nl->name = strdup(result);
		nlp = &nl->next;
	}
	*nlp = NULL;
	printf("grep performed successfully!\n");
	/*
	*          * Return the result
	*                   */
	res.errnum = 0;
    pclose(cmd);
	return (&res);
}
