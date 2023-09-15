/*TODO::
    - Fetch the AboutMeText from my github aboutMe 
    - Return the text as a string
    -------------------------------
    - Create a function that takes the text as a string and returns a 3D JSX element
*/

import React, { useState, useEffect } from 'react';

import { Text3D } from '@react-three/drei'

const raw = `https://raw.githubusercontent.com/lagom-QB/lagom-QB/main/README.md`;

const ThreeDText = ({ text, position, fontSize }) => {
  return (
    <Text3D 
            smooth={.1}
            font="/Inter_Bold.json"
            position={position}
            // fontSize={fontSize}
            curveSegments={32}
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.7}
            letterSpacing={-0.06}
            size={1.5}
            bevelEnabled>
      {text}
      <meshStandardMaterial color="white" />
    </Text3D>
  );
};
  
const AboutMeFetcher = ({url = raw, margin = 0.5, width, height }) => {
  const [aboutMeText, setAboutMeText] = useState([]);

  useEffect(() => {
    const fetchAboutMe = async () => {
        try {
          const response = await fetch(url);
          const html     = await response.text();
          const parser   = new DOMParser();
          const doc      = parser.parseFromString(html, 'text/html');
          let text       = doc.body.textContent;

        //   Remove the # and the * from the text
            text = text.replace(/[#*_]/g, '');

        // Split the text from 'Í have a BSc' getting everything before it
            text = text.split(/(?=I have a BSc)/g)[0];
        
        //   Split the text by double emojis
            text = text.split(/(?<=\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF})\s+(?=\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF})/gu);

          setAboutMeText(text);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchAboutMe()
  }, [url]);

  return (
  <ThreeDText 
    text={aboutMeText} 
    position={[-0,0,0]} 
    scale = {[100,100,10]} 
    color="0xfff" 
    fontSize={2}>
    {aboutMeText.map((text, index) => (
      <React.Fragment key={index}>
        {text.split('\n\n').map((paragraph, paragraphIndex) => {
          const hyphenCount = paragraph.split('-').length - 1;
          const fontSize =
            paragraphIndex === 0
              ? '4rem'
              : hyphenCount > 1
              ? '3rem'
              : '3.2rem';
            // Get only alphanumeric characters and punctuation removing emojis
            const formattedParagraph = paragraph.replace(/[^a-zA-Z0-9.,!? ]/g, '');
            // Remove all ?s
            const reFormattedParagraph = formattedParagraph.replace(/-/g, '\n\n-');
            const rereFormattedParagraph = reFormattedParagraph.replace(/-/g, '\n\n-');
            const sentences = rereFormattedParagraph.split(/(?<=[.!?])\s+/);

          return (
            <React.Fragment key={paragraphIndex}>
              <h1 style={{ fontSize }}>
                {sentences.map((sentence, sentenceIndex) => ( // Iterate over the sentences (paragraphs)
                  <React.Fragment key={sentenceIndex}>
                    {sentence
                      .split(',') // Split the sentences by commas
                      .map((word, wordIndex, arr) => ( // Iterate over the words (sentences)
                        <React.Fragment key={wordIndex}> 
                          {word.trim()} {/* // Remove the whitespace */}
                          {wordIndex !== arr.length - 1 && <br />} {/* // Add a line break if it's not the last word */}
                          {console.log(`Initial sentence: ${sentence}\nWord : ${word}`)}  
                          <br />
                        </React.Fragment>
                      ))}
                    <br />
                  </React.Fragment>
                ))}
              </h1>
              {paragraphIndex !== text.split('\n\n').length - 1 && <br />} {/* // Add a line break if it's not the last paragraph */}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    ))}
  </ThreeDText>
  );
};

export default AboutMeFetcher;

