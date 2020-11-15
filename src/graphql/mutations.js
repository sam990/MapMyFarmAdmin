/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFarm = /* GraphQL */ `
  mutation CreateFarm($input: FarmInput!) {
    createFarm(input: $input) {
      id
      farmID
      area
      locale
      coordinatesLat
      coordinatesLng
      land_type
    }
  }
`;
export const createHarvest = /* GraphQL */ `
  mutation CreateHarvest($input: HarvestInput!) {
    createHarvest(input: $input) {
      id
      crop
      seed_brand
      sowing_date
      planting_mode
      weeding_mode
      harvest_cutting_mode
      fertilizer
      pesticide
      prev_seed_packets
      prev_seed_price
      prev_num_labour
      prev_labour_days
      prev_labour_charge
      prev_machine_charge
      prev_fertilizer_packets
      prev_fertilizer_charge
      prev_pesticide_packets
      prev_pesticide_charge
      comments
    }
  }
`;
export const createFarmMapping = /* GraphQL */ `
  mutation CreateFarmMapping($input: FarmMappingInput!) {
    createFarmMapping(input: $input) {
      farmID
      harvestID
    }
  }
`;
export const updateFarm = /* GraphQL */ `
  mutation UpdateFarm($input: UpdateFarmInput!) {
    updateFarm(input: $input) {
      id
      farmID
      area
      locale
      coordinatesLat
      coordinatesLng
      land_type
    }
  }
`;
export const updateHarvest = /* GraphQL */ `
  mutation UpdateHarvest($input: UpdateHarvestInput!) {
    updateHarvest(input: $input) {
      id
      crop
      seed_brand
      sowing_date
      planting_mode
      weeding_mode
      harvest_cutting_mode
      fertilizer
      pesticide
      prev_seed_packets
      prev_seed_price
      prev_num_labour
      prev_labour_days
      prev_labour_charge
      prev_machine_charge
      prev_fertilizer_packets
      prev_fertilizer_charge
      prev_pesticide_packets
      prev_pesticide_charge
      comments
    }
  }
`;
export const deleteFarm = /* GraphQL */ `
  mutation DeleteFarm($input: DeleteFarmInput!) {
    deleteFarm(input: $input) {
      id
      farmID
      area
      locale
      coordinatesLat
      coordinatesLng
      land_type
    }
  }
`;
export const deleteHarvest = /* GraphQL */ `
  mutation DeleteHarvest($input: DeleteHarvestInput!) {
    deleteHarvest(input: $input) {
      id
      crop
      seed_brand
      sowing_date
      planting_mode
      weeding_mode
      harvest_cutting_mode
      fertilizer
      pesticide
      prev_seed_packets
      prev_seed_price
      prev_num_labour
      prev_labour_days
      prev_labour_charge
      prev_machine_charge
      prev_fertilizer_packets
      prev_fertilizer_charge
      prev_pesticide_packets
      prev_pesticide_charge
      comments
    }
  }
`;
export const deleteFarmMapping = /* GraphQL */ `
  mutation DeleteFarmMapping($input: DeleteFarmMappingInput!) {
    deleteFarmMapping(input: $input) {
      farmID
      harvestID
    }
  }
`;
export const batchDeleteFarmMappings = /* GraphQL */ `
  mutation BatchDeleteFarmMappings($input: [DeleteFarmMappingInput]!) {
    batchDeleteFarmMappings(input: $input) {
      farmID
      harvestID
    }
  }
`;
