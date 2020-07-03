	

	let allchars = { 
			 'Aizen':[ 
						{name: 'Urahara', type: 'HP' , prc: 34} ,
					   	{name: 'Gin', type: 'ATK' , prc: 17},
						{name: 'IchigoSR', type: 'ATK' , prc: 12}
					 ],
		
			 'AizenArrancar': [
						{name: 'Aizen', type: 'ATK' , prc: 18},
						{name: 'MugetsuIchigo', type: 'HP' , prc: 44},
						{name: 'FinalFusionAizen', type: 'ATK' , prc: 21},
						{name: 'WhiteDayAizen', type: 'Armor' , prc: 38},
						{name: 'ParasolGrimmjow', type: 'HP' , prc: 40},
						{name: 'DangaiIchigo', type: 'ATK' , prc: 19},
					 ]
	
			};

	


	let teamsize = 6
	var result = Array(teamsize)
	
	function combine(input, len, start) {
	  if(len === 0) {
	    printteam(result.slice())
	    return;
	  }
	  for (let i = start; i <= input.length - len; i++) {
	    result[result.length - len] = input[i];
	    combine(input, len-1, i+1 );
	  }
	}
	
	
	function calculateTeam() {
  		//parse the data from document.getElementById("ownchars").text  into mychars array
  		
  		var area = document.getElementById("ownchars");             
		var mychars = area.value.replaceAll(" ","").replace(/\t/g,"").replace(/\r\n/g,"\n").split("\n");
		
		//remove previous builds]
		document.getElementById("presentation").innerHTML = '';
  		
		//calculatee new builds
		combine(mychars, teamsize, 0)
		
		document.getElementById("presentation").innerHTML += '<hr/>';
  		
	}
	
	function isBound(main, bound){

		if(allchars[main] ==null) return false;
		var bonds = allchars[main];
		
		
		for(let i=0; i< bonds.length; i++){
			
			if(bonds[i].name == bound){
				return true;
			}
		}
		
		return false;
	}
	
	function teamValid(team){

		for(let i=1;i< teamsize; i++){
			if(!isBound(team[0],team[i])) return false;
		}
		
		return true;
	}
	
	function teamStats(team){
		let atk = 0;
		let hp=0;
		let armor = 0;
		
		var bonds = allchars[team[0]];
		
		for(let k=1; k<team.length; k++){
			
			for(let i=0; i< bonds.length; i++){
			
				if(bonds[i].name == team[k]){
					
					if (bonds[i].type == 'ATK'){
						atk += 1;
					} else if (bonds[i].type == 'HP'){
						hp += 1;
					} else if (bonds[i].type == 'Armor'){
						armor += 1;
					}

				}
			}
		}
			

		
		return '+ATK: '+atk +
			   '+HP: '+hp +
			   '+Armor: '+armor ;
	}
	
	function printteam(team){
	
		if( teamValid(team) ){
			document.getElementById("presentation").innerHTML += team+' '+ teamStats(team)+'<br/>';
		}
	}
	
	
	