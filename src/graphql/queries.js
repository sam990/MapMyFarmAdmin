/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFarm = /* GraphQL */ `
  query GetFarm($id: ID!) {
    getFarm(id: $id) {
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
export const getHarvest = /* GraphQL */ `
  query GetHarvest($id: ID!) {
    getHarvest(id: $id) {
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
export const batchGetFarms = /* GraphQL */ `
  query BatchGetFarms($ids: [ID]!) {
    batchGetFarms(ids: $ids) {
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
export const batchGetHarvests = /* GraphQL */ `
  query BatchGetHarvests($ids: [ID]!) {
    batchGetHarvests(ids: $ids) {
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
export const listUserFarms = /* GraphQL */ `
  query ListUserFarms($ownerSub: String, $limit: Int, $nextToken: String) {
    listUserFarms(ownerSub: $ownerSub, limit: $limit, nextToken: $nextToken) {
      items {
        id
        farmID
        area
        locale
        coordinatesLat
        coordinatesLng
        land_type
      }
      nextToken
    }
  }
`;
export const listUserHarvests = /* GraphQL */ `
  query ListUserHarvests($ownerSub: String, $limit: Int, $nextToken: String) {
    listUserHarvests(
      ownerSub: $ownerSub
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listUserFarmMappings = /* GraphQL */ `
  query ListUserFarmMappings(
    $ownerSub: String
    $limit: Int
    $nextToken: String
  ) {
    listUserFarmMappings(
      ownerSub: $ownerSub
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        farmID
        harvestID
      }
      nextToken
    }
  }
`;
export const listFarms = /* GraphQL */ `
  query ListFarms(
    $filter: TableFarmFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFarms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        farmID
        area
        locale
        coordinatesLat
        coordinatesLng
        land_type
      }
      nextToken
    }
  }
`;
export const listHarvest = /* GraphQL */ `
  query ListHarvest(
    $filter: TableHarvestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHarvest(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listFarmMappings = /* GraphQL */ `
  query ListFarmMappings(
    $filter: TableFarmMappingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFarmMappings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        farmID
        harvestID
      }
      nextToken
    }
  }
`;
