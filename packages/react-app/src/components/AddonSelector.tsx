'use client';

import { useConfiguratorStore, type AddonModule } from '@/stores/configurator';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation
} from '@hello-pangea/dnd';

export default function AddonSelector() {
  const availableModules = useConfiguratorStore(state => state.availableModules);
  const selectedModules = useConfiguratorStore(state => state.selectedModules);
  const updateAvailableModules = useConfiguratorStore(state => state.updateAvailableModules);
  const updateSelectedModules = useConfiguratorStore(state => state.updateSelectedModules);

  function getCategoryClass(category: AddonModule['category']) {
    switch (category) {
      case 'resource':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'feature':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'support':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      dragWithinSameColumn(source, destination);

      return;
    }

    dragToDifferentColumn(source, destination);
  }

  function dragWithinSameColumn(
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>
  ) {
    const isAvailableZone = source.droppableId === 'available';

    const listCopy = isAvailableZone ? [...availableModules] : [...selectedModules];
    const [removed] = listCopy.splice(source.index, 1);
    listCopy.splice(destination.index, 0, removed);

    if (isAvailableZone) {
      updateAvailableModules(listCopy);
    } else {
      updateSelectedModules(listCopy);
    }
  }

  function dragToDifferentColumn(
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>
  ) {
    const isSourceAvailable = source.droppableId === 'available';

    const sourceList = isSourceAvailable ? [...availableModules] : [...selectedModules];
    const destList = isSourceAvailable ? [...selectedModules] : [...availableModules];

    const [removed] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, removed);

    if (isSourceAvailable) {
      updateAvailableModules(sourceList);
      updateSelectedModules(destList);
    } else {
      updateAvailableModules(destList);
      updateSelectedModules(sourceList);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">
            Dostupné moduly
          </h3>

          <Droppable droppableId="available">
            {provided => (
              <div
                className="flex-1 space-y-3 min-h-50"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {availableModules.map((module, index) => (
                  <Draggable key={module.id} draggableId={module.id} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center 
                        justify-between cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-300 group-hover:text-slate-500 transition-colors">
                            ⋮⋮
                          </span>
                          <div>
                            <div className="font-semibold text-slate-900">{module.nameKey}</div>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-md border font-medium mt-1 inline-block 
                              ${getCategoryClass(module.category)}`}
                            >
                              {module.category}
                            </span>
                          </div>
                        </div>
                        <div className="font-extrabold text-slate-900">
                          +{module.price}{' '}
                          <span className="text-xs font-normal text-slate-500 ml-1">USD</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="flex flex-col bg-indigo-50/50 p-5 rounded-2xl border-2 border-dashed border-indigo-200">
          <h3 className="font-bold text-sm text-indigo-900 uppercase tracking-wider mb-4">
            Vybrané moduly
          </h3>

          <Droppable droppableId="selected">
            {provided => (
              <div
                className="flex-1 space-y-3 min-h-50 relative"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {selectedModules.length === 0 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-sm text-slate-400 italic 
                  pointer-events-none"
                  >
                    Zatím nemáš vybrané žádné moduly
                  </div>
                )}
                {selectedModules.map((selectedModule, index) => (
                  <Draggable key={selectedModule.id} draggableId={selectedModule.id} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center 
                        justify-between cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-300 group-hover:text-slate-500 transition-colors">
                            ⋮⋮
                          </span>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {selectedModule.nameKey}
                            </div>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-md border font-medium mt-1 inline-block 
                              ${getCategoryClass(selectedModule.category)}`}
                            >
                              {selectedModule.category}
                            </span>
                          </div>
                        </div>
                        <div className="font-extrabold text-slate-900">
                          +{selectedModule.price}{' '}
                          <span className="text-xs font-normal text-slate-500 ml-1">USD</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
