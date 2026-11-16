export const lossStories = {
  kenco: {
    slug: 'kenco',
    eyebrow: 'Loss & lessons',
    name: 'Kenco Group',
    headline: 'Strong trial results, but the wrong proof for the buying decision.',
    description: 'What Dave Alexander learned from losing Kenco: test the buyer’s operating requirements, resolve objections before the deadline, and keep the decision map current.',
    metrics: [
      { label: 'Outcome', value: 'Lost' },
      { label: 'Proposed deployment', value: '250', unit: 'cameras' },
      { label: 'Trial deployment', value: '5', unit: 'vehicles' },
    ],
    sections: [
      {
        title: 'The opportunity',
        paragraphs: ['Kenco was evaluating a replacement for SmartDrive across its transportation operations. I worked with our team and Kenco’s safety and operations leaders in a competitive evaluation against Samsara and Lytx. The proposed deployment was 250 cameras. From early discovery, Kenco described cumbersome installation, moving hardware between trucks, and the need for flexible coaching across business units.'],
      },
      {
        title: 'What I did',
        paragraphs: ['I helped run a five-vehicle trial and brought operations, safety, compliance, and executive stakeholders into the evaluation. Our team showed strong reductions in safety alerts and built a business case projecting payback in under 17 months.', 'We responded to feedback with hardware changes, coaching explanations, and a preview of an updated interface. But the customer could not test the new interface before its decision deadline.'],
      },
      {
        title: 'Why we lost',
        paragraphs: ['Kenco told us it selected Samsara because the hardware was easier to move between trucks and the scoring and coaching were more customizable. Pricing was comparable. The final decision also included a new VP of Operations whom we had never met.', 'Our trial proved safety value, but it did not settle the operating requirements that mattered most to the people implementing the system.'],
      },
      {
        title: 'What I own',
        paragraphs: ['I put too much weight on strong safety results and too little on proving the customer’s daily workflows. Installation and hardware mobility needed to be central evaluation criteria. I also had broad stakeholder coverage without complete coverage of the final decision. I should have rechecked who would be in that room.'],
      },
      {
        title: 'What I take forward',
        highlight: true,
        items: [
          { title: 'Test the buyer’s criteria.', text: 'Turn recurring operational objections into measurable trial tests, performed by the people who will use and support the system.' },
          { title: 'Work backward from the decision.', text: 'A future fix only helps if the customer can evaluate it in time or explicitly agrees to wait.' },
          { title: 'Refresh the decision map.', text: 'Before the final readout, confirm who decides and bring any new stakeholder into the conversation.' },
        ],
      },
    ],
  },
  tcw: {
    slug: 'tcw',
    eyebrow: 'Loss & lessons',
    name: 'TCW',
    headline: 'Winning safety was not enough to win a full-platform decision.',
    description: 'What Dave Alexander learned from losing TCW: qualify the full platform purchase, secure executive alignment, and treat mandatory roadmap dependencies as deal risk.',
    metrics: [
      { label: 'Outcome', value: 'Lost' },
      { label: 'Proposed deployment', value: '350', unit: 'vehicles' },
      { label: 'Trial phases', value: '4' },
    ],
    sections: [
      {
        title: 'The opportunity',
        paragraphs: ['TCW was an outbound opportunity to replace its PeopleNet / Platform Science environment. The proposed scope included 350 cameras and 350 electronic logging devices, or ELDs. The safety team was interested in our detection capabilities, but the buying decision expanded beyond cameras to a combined safety and ELD platform. That brought the President and IT into the decision.'],
      },
      {
        title: 'What I did',
        paragraphs: ['I built a strong relationship with the Director of Safety and worked through repeated evaluations with the safety team. When detection concerns surfaced, I involved solutions engineering and product rather than dismissing the feedback. The customer’s safety feedback became favorable, and we continued pursuing a broader platform agreement.', 'I also presented competitive commercial terms. But more evaluation and better pricing did not resolve the requirement for a proven ELD or secure direct alignment with the President.'],
      },
      {
        title: 'Why we lost',
        paragraphs: ['TCW needed a complete platform it could confidently deploy. Our native ELD was still awaiting approval as the customer approached its decision deadline, and the buyer had concerns about relying on a new release. TCW narrowed its choices to Samsara and Motive; the final vendor selection was not confirmed.', 'Support for our safety product could not overcome a mandatory gap in the full purchase.'],
      },
      {
        title: 'What I own',
        paragraphs: ['I allowed the evaluation to continue without securing a meeting with the economic buyer. I also treated ELD availability as a timing issue for too long instead of a qualification issue. My champion was a strong safety advocate, but the platform decision belonged to a broader group. I needed to rebuild the deal plan around that reality.'],
      },
      {
        title: 'What I take forward',
        highlight: true,
        items: [
          { title: 'Give every pilot a decision path.', text: 'Agree on success criteria, an executive readout, and what happens if the evaluation succeeds before committing trial resources.' },
          { title: 'Requalify when the scope changes.', text: 'A platform purchase needs alignment with IT and the economic buyer, even when the original champion loves one part of the product.' },
          { title: 'Make roadmap risk explicit.', text: 'Confirm whether the buyer can wait, agree on a contingency if delivery slips, and pause when a mandatory requirement cannot be met.' },
        ],
      },
    ],
  },
}
