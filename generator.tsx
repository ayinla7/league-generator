interface MatchResult {
  id: string;
  match: number;
  gf: number;
  ga: number;
  gd: number;
  outcome: string;
  point: number;
}

let matchResults: any = []
let finalTable = []

class FootballLeague {
  teams: string[];

  constructor(numberOfTeams: number) {
    if ((numberOfTeams % 2 !== 0)) {
      throw new Error("A football league must have even number of teams.");
    } else {
      this.teams = this.generateTeams(numberOfTeams)
    }
  }

  generateTeams(numTeams: number): string[] {
    const teams: string[] = [];

    for (let i = 0; i < numTeams; i++) {
      teams.push(`Team ${String.fromCharCode(65 + i)}`);
    }
    return teams;
  }


    generateMatches() {
      const matches: string[][] = [];
      const scores: number[][] = [];

      for (let i = 0; i < this.teams.length - 1; i++) {
        for (let j = i + 1; j < this.teams.length; j++) {
          let randomScore1 = Math.floor(Math.random() * 6);
          let randomScore2 = Math.floor(Math.random() * 6);
          
          const match = [this.teams[i], this.teams[j]];
          const score = [randomScore1, randomScore2];
          matches.push(match);
          scores.push(score);
          
          // let randomScore1b = Math.floor(Math.random() * 6);
          // let randomScore2b = Math.floor(Math.random() * 6);
          // const matchb = [this.teams[j], this.teams[i]];
          // const scoreb = [randomScore1b, randomScore2b];
          // matches.push(matchb);
          // scores.push(scoreb);
        }
      }
      return [matches, scores];
    }

    simulateMatches(matches: number[][] | string[][], scores: number[][] | string[][], matchResults: any) {
      matches.forEach((match, index) => {
        //console.log(`Match ${index + 1}: ${match[0]} (${scores[index][0]}) vs (${scores[index][1]}) ${match[1]}`);
        matchResults.push(
          {
            "id": match[0],
            "match": index + 1,
            "gf": scores[index][0],
            "ga": scores[index][1],
            "gd": getOutcome(scores[index][0], scores[index][1])[0],
            "outcome": getOutcome(scores[index][0], scores[index][1])[1],
            "point": getOutcome(scores[index][0], scores[index][1])[2],
          });

        matchResults.push(
          {
            "id": match[1],
            "match": index + 1,
            "gf": scores[index][1],
            "ga": scores[index][0],
            "gd": getOutcome(scores[index][1], scores[index][0])[0],
            "outcome": getOutcome(scores[index][1], scores[index][0])[1],
            "point": getOutcome(scores[index][1], scores[index][0])[2],
          });
      });
    }

    showResults() {
      matches.forEach((match, index) => {
        console.log(`Match ${index + 1}: ${match[0]} (${scores[index][0]}) vs (${scores[index][1]}) ${match[1]}`);
      });
    }

    showTable() {
      this.teams.forEach((team) => {
        console.log(`Total points for ${team}: ${sumPointsForTeam(matchResults, team)} 
    with ${sumGoalsForTeam(matchResults, team)} goals`);
      });
    }

  }

function sumPointsForTeam(matches: MatchResult[], teamId: string): number {
  return matches
    .filter((match) => match.id === teamId)
    .reduce((sum, match) => sum + match.point, 0);
}

function sumGoalsForTeam(matches: MatchResult[], teamId: string): number {
  return matches
    .filter((match) => match.id === teamId)
    .reduce((sum, match) => sum + match.gd, 0);
}

function getOutcome(gf: any, ga: any): any {
  let diff = gf - ga;
  if (gf === ga) {
    return [diff, "draw", 1]
  } else if (gf > ga) {
    return [diff, "win", 3]
  } else {
    return [diff, "loss", 0]
  }
}

// Example usage
const league = new FootballLeague(20);
const [matches, scores] = league.generateMatches();
league.simulateMatches(matches, scores, matchResults)
league.showResults();
league.showTable();

