function computePolkadotScore(asciiArt) {
  const lines = asciiArt.split('\n');
  
  // Find lips boundaries - locate †(–)Ë pattern
  let lipsStartX = -1;
  let lipsEndX = -1;
  
  for (const line of lines) {
    const matchPos = line.indexOf('†(–)Ë');
    if (matchPos !== -1) {
      // – character is at position matchPos + 2 within the †(–)Ë pattern
      lipsStartX = matchPos + 2;
      lipsEndX = matchPos + 2;
    }
  }
  
  // Count pupil characters - find unique chars inside (X) excluding -, ', `, ,
  const pupilCharSet = new Set();
  
  for (const line of lines) {
    let match;
    while ((match = /\((.)\)/g.exec(line)) !== null) {
      const char = match[1];
      if (char !== '-' && char !== "'" && char !== '`' && char !== ',') {
        pupilCharSet.add(char);
      }
    }
  }
  
  const pupilCharCount = pupilCharSet.size > 0 ? pupilCharSet.size : 1;
  
  // Count all polkadots (• character) - these are the main polkadots
  let polkadotsInRange = 0;
  let polkadotsOutsideRange = 0;
  
  for (const line of lines) {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '•') {
        if (lipsStartX !== -1 && x >= lipsStartX && x <= lipsEndX) {
          polkadotsInRange++;
        } else {
          polkadotsOutsideRange++;
        }
      }
    }
  }
  
  // Also count O characters as polkadots (dress decoration)
  for (const line of lines) {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === 'O') {
        if (lipsStartX !== -1 && x >= lipsStartX && x <= lipsEndX) {
          polkadotsInRange++;
        } else {
          polkadotsOutsideRange++;
        }
      }
    }
  }
  
  // Calculate score: Outside + (Inside * Pupils)
  const score = polkadotsOutsideRange + (polkadotsInRange * pupilCharCount);
  
  return {
    score,
    breakdown: {
      polkadotsOutsideRange,
      polkadotsInRange,
      pupilCharCount,
      polkadotsInsideTimesMultiplier: polkadotsInRange * pupilCharCount
    },
    debug: {
      lipsRange: `[${lipsStartX}, ${lipsEndX}]`,
      pupilCharsFound: Array.from(pupilCharSet)
    }
  };
}

// Angelica ASCII art
const asciiArt = `              ,   ,-',
        ,', ,'  ','  ,'   ÅÑGË£ÏÇÄ †(–)Ë ßRÄ†
      '-',  '      ,'
          ' -,    ',
              ' -, ',                                         , - - -,
             ('''''' ®'''''''')                        ,,,,,    ,-' -,''''''''',
              \` ~„''​\`„~ '                          ',  ,', -' , -,'' ''''''''',
                  "„  " - „                   „ - ",®,-'     \`~~' '''''''
                 „"         " „         „ - "      ,',,,',
               „-" " " " " " " ~~~~~~" - „       ,'
            „" –,'' ~ ,       • ; •          "      "„
            """";      ' - , ,  ; , , , - '' ' ' -,_ ', ',
           , -' ' ',           ,'    ,'             ',~', ',
         ,'         ' - , ,()' /\\    ',          (),'¯ ,'   \`¸\`;
         ',                            \` \` \` \` \` \`      ,-,,,-'
           '-,                                  ,¬  ,-'
              ' -, ~            ~~~~~~' ' \` ,-'
                  \`~-,,,,,,,      ,,,,,,,,,,-~'
      ('('('(,,,              ;    ;                •Å(V)åö•
       '-, '-,'''      ,-';\\`,\`'ˆˆˆˆˆ ,' ;' ' -,           •97•
         ;¯ ;      ;  ;  ', ; ; ,'  ;  ‚¸  ' -,        •••
         ;   ;     ;       '''''''''''    \`\`'-,',  ,'
         ;   ;, -¬;    O   O   O  O   '-',,,,,,,,,,,,
         ;        ;  O   O     O O    O  ,'     O     ,'
          ' - - ' \`;    O        O  O    O   O    ,'
               ,-'   O    O    O  O      O    O   ,'
            ,-' O O  O   O        O        O ,'
         ,-'   O      O   O   O     O  O     ,'
      ,-'  O    O    O  O   O   O O O   O,-'-,
       \`\`¬ -,,,,,,,-¬~,~~~~~~~~~--',)  (' -,
                    ',   (',                     ' -,    '-,
                     ',)  (',                        \`-,)  ' -,
                      ',    ',                           \`-,  ,',-----,
                       ',)   ;                              \`\\,- ---'
                   ¸,,,,'‡  (;
                  (¸,,,,,';_'\\ ßy §(V)òó†(–)775 ™`;

const result = computePolkadotScore(asciiArt);
console.log('=== Polkadot Score Result ===');
console.log('Final Score:', result.score);
console.log('\nBreakdown:');
console.log('  Polkadots Outside Range:', result.breakdown.polkadotsOutsideRange);
console.log('  Polkadots Inside Range:', result.breakdown.polkadotsInRange);
console.log('  Pupil Character Count:', result.breakdown.pupilCharCount);
console.log('  Inside × Pupils:', result.breakdown.polkadotsInsideTimesMultiplier);
console.log('\nDebug Info:');
console.log('  Lips Range:', result.debug.lipsRange);
console.log('  Pupil Characters Found:', result.debug.pupilCharsFound);
