import fetch from 'node-fetch';
import chalk from 'chalk';

const client = mozaik => {

	return {
		
		build( params ){

			mozaik.logger.info(chalk.yellow(`[jenkins] calling jenkins.build`));

			return fetch(`${params.url}/job/${params.name}/lastBuild/api/json`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(json => { 
					if(json.building){//si en cour de build alors intervale reduit à 5 secondes
							mozaik.bus.changeInterval(`jenkins.build.${params.name}`, 5000);
					} else {
							const { apisPollInterval } = mozaik.config;
							mozaik.bus.changeInterval(`jenkins.build.${params.name}`, apisPollInterval);//si pas en cour de build intervale restoré à apisPollInterval
					}
					return json ;
			})
			.error(err => {
				console.log(err)
				return {err : err}
			})
		},

		test ( params ){

			mozaik.logger.info(chalk.yellow(`[jenkins] calling jenkins.test`));

			return fetch(`${params.url}/job/${params.name}/lastBuild/api/json`,{
				method : 'GET',
				headers : {'Accept': 'application/json'}
			})
			.then(res => res.json())
			.then(json =>{ 
				if(json.building){
					return {error : "En cours ..."}
				} else {
					if(json.result === "FAILURE"){
						return {error : "Le build du test a échoué"}
					} else {
						return fetch(`${params.url}/job/${params.name}/${json.id}/allure/widgets/summary.json`,{ method : 'GET', headers : {'Accept': 'application/json'}})
						.then(res => res.json())
						.catch(err => err)
					}
				}})
			.catch(err => err)
		}
	}
};

export default client;
