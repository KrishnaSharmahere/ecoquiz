export interface SourceItem {
  id: string;
  name: string;
  shortName: string;
  focus: string;
  description: string;
  topicsCovered: string[];
}

export const CITED_SOURCES: SourceItem[] = [
  {
    id: 'us-epa-watersense',
    name: 'US EPA WaterSense',
    shortName: 'US EPA WaterSense',
    focus: 'Residential & Commercial Water Efficiency Standards',
    description: 'A voluntary partnership program sponsored by the U.S. Environmental Protection Agency providing verified data on household water fixtures, leaks, and residential conservation benchmarks.',
    topicsCovered: ['Water']
  },
  {
    id: 'us-doe',
    name: 'US Department of Energy',
    shortName: 'US Department of Energy',
    focus: 'Energy Efficiency & Renewable Technology',
    description: 'Federal scientific research and technical standards on lighting efficiency (LED vs incandescent), building heat pumps, residential standby loads, and clean energy systems.',
    topicsCovered: ['Energy']
  },
  {
    id: 'ipcc',
    name: 'Intergovernmental Panel on Climate Change (IPCC)',
    shortName: 'IPCC',
    focus: 'Global Climate Science & Assessment Reports',
    description: 'The United Nations scientific body assessing human-induced climate change, global temperature anomalies, radiative forcing, emissions pathways, and remaining carbon budgets.',
    topicsCovered: ['Climate', 'Waste']
  },
  {
    id: 'iucn-red-list',
    name: 'IUCN Red List of Threatened Species',
    shortName: 'IUCN Red List',
    focus: 'Global Species Conservation Status',
    description: 'The world\'s most comprehensive global database assessing the extinction risk of animal, fungal, and plant species across rigorous categories from Least Concern to Extinct.',
    topicsCovered: ['Biodiversity']
  },
  {
    id: 'ramsar-convention',
    name: 'Ramsar Convention on Wetlands',
    shortName: 'Ramsar Convention',
    focus: 'Wetland Conservation & Blue Carbon Sinks',
    description: 'An intergovernmental treaty (1971) providing the international framework for the conservation, wise use, and restoration of wetlands, peatlands, and coastal marine biomes.',
    topicsCovered: ['Water', 'Biodiversity']
  },
  {
    id: 'cites',
    name: 'Convention on International Trade in Endangered Species (CITES)',
    shortName: 'CITES',
    focus: 'International Wildlife Trade Controls',
    description: 'A legally binding international treaty ensuring that commercial international trade in specimens of wild animals and plants does not threaten their survival.',
    topicsCovered: ['Biodiversity']
  },
  {
    id: 'montreal-protocol',
    name: 'Montreal Protocol on Substances that Deplete the Ozone Layer',
    shortName: 'Montreal Protocol',
    focus: 'Stratospheric Ozone Layer Protection & ODS Phase-out',
    description: 'The universally ratified multilateral treaty regulating the phase-out of ozone-depleting substances (ODSs) such as CFCs and halogenated compounds, plus Kigali HFC controls.',
    topicsCovered: ['Climate']
  },
  {
    id: 'paris-agreement',
    name: 'Paris Agreement (UNFCCC)',
    shortName: 'Paris Agreement',
    focus: 'Global Climate Change Mitigation & 1.5°C Goal',
    description: 'A legally binding international climate treaty adopted at COP21, establishing the goal to hold global temperature increase well below 2.0°C and pursue efforts for 1.5°C.',
    topicsCovered: ['Climate']
  },
  {
    id: 'india-e-waste-rules-2022',
    name: 'India\'s E-Waste (Management) Rules, 2022',
    shortName: 'India\'s E-Waste (Management) Rules, 2022',
    focus: 'Statutory Extended Producer Responsibility (EPR)',
    description: 'Statutory rules enacted under India\'s Environment (Protection) Act, mandating legally binding EPR targets for manufacturers, recyclers, and solar module waste streams.',
    topicsCovered: ['Waste']
  },
  {
    id: 'water-footprint-network',
    name: 'Water Footprint Network',
    shortName: 'Water Footprint Network',
    focus: 'Virtual Water & Water Footprint Accounting',
    description: 'International platform pioneering standard methodologies for quantifying the green, blue, and grey freshwater volumes embedded in agricultural goods and industrial manufacturing.',
    topicsCovered: ['Water']
  }
];

export const SOURCE_DISCLAIMER_NOTE = 
  "Check the original report before quoting a figure.";
