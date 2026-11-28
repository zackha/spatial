<template>
  <SpDialog title="Delete download?" description="The film will be removed from this device.">
    <template #trigger>
      <SpButton>Delete download</SpButton>
    </template>
    <template #footer="{ close }">
      <SpButton variant="plain" @click="close">
        Cancel
      </SpButton>
      <SpButton variant="prominent" @click="close">
        Delete
      </SpButton>
    </template>
  </SpDialog>
</template>
