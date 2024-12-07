<script setup lang="ts">
useHead({ title: "New Warehouse" });
const warehouse = reactive<warehousePayLoad>({
  warehouseId: "",
  warehouseName: "",
  contactPerson: "",
  phone: "",
  location: "",
  employees: 0,
  warehouseType: "",
});

/**
 * Create warehouse function
 * @author PSK
 * @created 2024-12-01
 * @updated ****-**-**
 */
const createWarehouse = () => {
  console.log("createWarehouse", warehouse);
};
</script>
<template>
  <div class="flex gap-4 justify-between items-start w-full py-3">
    <div
      class="w-full bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg flex justify-center items-center pb-5"
    >
      <Card class="w-1/2 shadow-none bg-transparent">
        <template #title>
          <h2 class="text-2xl py-3 mb-5 text-accentblack dark:text-accentwhite">New Warehouse</h2>
        </template>
        <template #content>
          <div class="space-y-8">
            <!-- Warehouse Code -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.warehouseId"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label  bg-accentwhite dark:text-accentwhite dark:bg-primarydark"
                  >Warehouse Code</label
                >
              </FloatLabel>
            </div>

            <!-- Warehouse Name -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.warehouseName"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label bg-accentwhite dark:text-accentwhite dark:bg-primarydark"
                  >Warehouse Name</label
                >
              </FloatLabel>
            </div>

            <!-- Contact Person -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.contactPerson"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label bg-accentwhite dark:text-accentwhite dark:bg-primarydark"
                  >Contact Person</label
                >
              </FloatLabel>
            </div>

            <!-- Phone -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.phone"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label bg-accentwhite dark:text-accentwhite dark:bg-primarydark">Phone</label>
              </FloatLabel>
            </div>

            <!-- Location -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.location"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label bg-accentwhite dark:text-accentwhite dark:bg-primarydark"
                  >Location</label
                >
              </FloatLabel>
            </div>

            <!-- Number of Employee -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.employees"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label bg-accentwhite dark:text-accentwhite dark:bg-primarydark"
                  >Number of Employee</label
                >
              </FloatLabel>
            </div>

            <!-- Warehouse type -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="warehouse.warehouseType"
                  class="border w-full h-10 pl-2 dark:bg-transparent text-accentblack dark:text-accentwhite"
                />
                <label for="on_label" class="text-sm text-label bg-accentwhite dark:text-accentwhite dark:bg-primarydark"
                  >Warehouse Type</label
                >
              </FloatLabel>
            </div>

            <!-- Submit Button -->
            <Button
              type="submit"
              severity="secondary"
              label="Save"
              @click="createWarehouse"
              class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer dark:bg-accent2 dark:text-accentwhite"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
