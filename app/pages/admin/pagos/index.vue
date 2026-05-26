<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const supabase = useSupabase()

const orders = ref<any[]>([])
const loading = ref(false)
const processingOrderId = ref<string | null>(null)

const loadOrders = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('course_orders')
      .select(`
        *,
        courses ( id, title, slug )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    orders.value = data || []
  }
  catch (error) {
    console.error('Error loading orders:', error)
    alert('No se pudieron cargar las órdenes. Revisa políticas/columnas en Supabase.')
  }
  finally {
    loading.value = false
  }
}

const markOrderAsPaidAndGrantAccess = async (order: any) => {
  processingOrderId.value = order.id
  try {
    const { error: orderError } = await supabase
      .from('course_orders')
      .update({
        payment_status: 'paid',
        updated_at: new Date().toISOString(),
        approved_at: new Date().toISOString()
      })
      .eq('id', order.id)

    if (orderError) throw orderError

    const { error: enrollmentError } = await supabase
      .from('course_enrollments')
      .upsert([
        {
          user_id: order.user_id,
          course_id: order.course_id,
          order_id: order.id,
          status: 'active',
          updated_at: new Date().toISOString()
        }
      ], { onConflict: 'user_id,course_id' })

    if (enrollmentError) throw enrollmentError

    await loadOrders()
    alert('Pago aprobado y acceso al curso habilitado correctamente.')
  }
  catch (error) {
    console.error('Error approving order:', error)
    alert('No se pudo aprobar la orden. Revisa RLS/columnas en Supabase.')
  }
  finally {
    processingOrderId.value = null
  }
}

const rejectOrder = async (order: any) => {
  processingOrderId.value = order.id
  try {
    const { error } = await supabase
      .from('course_orders')
      .update({
        payment_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id)

    if (error) throw error

    await loadOrders()
  }
  catch (error) {
    console.error('Error rejecting order:', error)
    alert('No se pudo rechazar la orden.')
  }
  finally {
    processingOrderId.value = null
  }
}

onMounted(() => {
  loadOrders()
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Pagos y Accesos</h1>
        <p class="text-gray-600">Aprueba pagos (efectivo, transferencia o tarjeta) para habilitar acceso al material.</p>
      </div>
      <UButton color="neutral" variant="outline" icon="i-lucide-refresh-cw" @click="loadOrders">
        Actualizar
      </UButton>
    </div>

    <div v-if="loading" class="text-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-orange-600 mx-auto" />
      <p class="text-gray-600 mt-3">Cargando órdenes...</p>
    </div>

    <div v-else-if="orders.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <UIcon name="i-lucide-receipt" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-gray-900 mb-2">No hay órdenes aún</h3>
      <p class="text-gray-600">Cuando un estudiante compre un curso, aparecerá aquí.</p>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Curso</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estudiante</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pago</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 align-top">
            <td class="px-6 py-4">
              <p class="font-semibold text-gray-900">{{ order.courses?.title || order.course_id }}</p>
              <p class="text-xs text-gray-500">{{ order.courses?.slug }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">
              <p class="font-medium">{{ order.payer_name || 'Sin nombre' }}</p>
              <p>{{ order.payer_email || '-' }}</p>
              <p class="text-xs text-gray-500">UID: {{ order.user_id }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">
              <p><strong>{{ order.currency }} {{ order.amount }}</strong></p>
              <p class="capitalize">{{ order.payment_method }}</p>
              <p class="capitalize text-xs text-gray-500">{{ order.purchase_mode }}</p>
              <a v-if="order.proof_url" :href="order.proof_url" target="_blank" class="text-xs text-orange-600 hover:text-orange-700">
                Ver comprobante
              </a>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2.5 py-1 rounded-full text-xs font-semibold"
                :class="order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : order.payment_status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'"
              >
                {{ order.payment_status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <UButton
                  v-if="order.payment_status !== 'paid'"
                  color="primary"
                  size="sm"
                  icon="i-lucide-check-circle"
                  :loading="processingOrderId === order.id"
                  @click="markOrderAsPaidAndGrantAccess(order)"
                >
                  Aprobar y dar acceso
                </UButton>
                <UButton
                  v-if="order.payment_status === 'pending'"
                  color="error"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-x-circle"
                  :loading="processingOrderId === order.id"
                  @click="rejectOrder(order)"
                >
                  Rechazar
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
