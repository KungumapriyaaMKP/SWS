"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(200);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Calculate radius dynamically based on screen width so nodes never clip on mobile
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const w = window.innerWidth;
        if (w < 380) {
          setRadius(115);
        } else if (w < 480) {
          setRadius(130);
        } else if (w < 640) {
          setRadius(155);
        } else if (w < 768) {
          setRadius(175);
        } else {
          setRadius(200);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleCloseActiveCard = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      handleCloseActiveCard();
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      const isCurrentlyExpanded = !!prev[id];

      if (!isCurrentlyExpanded) {
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Hardware-accelerated 60fps rotation loop using requestAnimationFrame
  useEffect(() => {
    let active = true;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (autoRotate && viewMode === "orbital" && !isDraggingRef.current) {
        setRotationAngle((prev) => (prev + delta * 0.015) % 360);
      }

      if (active) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (autoRotate && viewMode === "orbital") {
      lastTimeRef.current = performance.now();
      animFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      active = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [autoRotate, viewMode]);

  // Touch Swipe & Drag Support for Mobile & Mouse
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartXRef.current = e.touches[0].clientX;
      dragStartAngleRef.current = rotationAngle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDraggingRef.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - dragStartXRef.current;
      const newAngle = (dragStartAngleRef.current + deltaX * 0.4) % 360;
      setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartAngleRef.current = rotationAngle;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartXRef.current;
      const newAngle = (dragStartAngleRef.current + deltaX * 0.4) % 360;
      setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-[#3B0764] text-white border-purple-400";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  const activeItem = activeNodeId !== null
    ? timelineData.find((item) => item.id === activeNodeId)
    : null;

  return (
    <div
      className="w-full h-[420px] sm:h-[480px] md:h-[530px] flex flex-col items-center justify-center relative overflow-hidden rounded-none select-none touch-pan-y cursor-grab active:cursor-grabbing"
      ref={containerRef}
      onClick={handleContainerClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Dynamic Center Lotus Logo */}
          <div className="absolute flex items-center justify-center z-10 pointer-events-none">
            <img
              src="/logo.png"
              alt="Sumya Web Studio Logo"
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
              decoding="async"
              className="object-contain drop-shadow-2xl dark:brightness-125 transition-all duration-300 pointer-events-none"
              style={{
                width: `${Math.min(radius * 1.25, 270)}px`,
                height: `${Math.min(radius * 1.25, 270)}px`,
              }}
            />
          </div>

          {/* Dynamic Orbital Ring Circle */}
          <div
            className="absolute rounded-full border-2 border-purple-900/30 dark:border-purple-500/30 transition-all duration-300 pointer-events-none"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: 1,
              willChange: "transform",
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-transform duration-75 ease-out cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(59,7,100,0.4) 0%, rgba(0,0,0,0) 70%)`,
                    width: `${item.energy * 0.5 + 36}px`,
                    height: `${item.energy * 0.5 + 36}px`,
                    left: `-${(item.energy * 0.5 + 36 - 36) / 2}px`,
                    top: `-${(item.energy * 0.5 + 36 - 36) / 2}px`,
                  }}
                />

                <div
                  className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#3B0764] text-white shadow-xl shadow-purple-900/60 scale-125 border-pink-500"
                      : isRelated
                      ? "bg-[#2A0548] text-white border-purple-400 animate-pulse"
                      : "bg-[#1D0636] text-white border-purple-800/80 hover:border-pink-500/60"
                  }
                  border-2 transition-all duration-300 transform shadow-lg
                `}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                <div
                  className={`
                  absolute top-11 sm:top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] sm:text-xs font-bold tracking-wider uppercase
                  transition-all duration-300
                  ${isExpanded ? "text-purple-950 dark:text-white scale-110 font-extrabold" : "text-purple-950 dark:text-zinc-200"}
                `}
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Backdrop & Centered Floating Card for Active Stage */}
        {activeItem && expandedItems[activeItem.id] && (
          <>
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[250] transition-opacity duration-300"
              onClick={handleCloseActiveCard}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-sm z-[300] transition-all duration-300 px-2">
              <Card className="bg-[#120B24]/95 backdrop-blur-xl border-purple-500/40 text-white shadow-2xl shadow-purple-950/80 overflow-visible relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                  onClick={handleCloseActiveCard}
                >
                  <X size={14} />
                </Button>
                <CardHeader className="pb-2 pr-10">
                  <div className="flex justify-between items-center gap-2">
                    <Badge
                      className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-none ${getStatusStyles(
                        activeItem.status
                      )}`}
                    >
                      {activeItem.status === "completed"
                        ? "COMPLETE"
                        : activeItem.status === "in-progress"
                        ? "IN PROGRESS"
                        : "PENDING"}
                    </Badge>
                    <span className="text-xs font-mono text-purple-300/80">
                      {activeItem.date}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg font-serif font-bold mt-2 text-white">
                    {activeItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-zinc-300 leading-relaxed">
                  <p>{activeItem.content}</p>

                  <div className="mt-4 pt-3 border-t border-purple-500/20">
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold">
                      <span className="flex items-center text-pink-400">
                        <Zap size={12} className="mr-1 text-pink-400" />
                        Completion Level
                      </span>
                      <span className="font-mono text-white">{activeItem.energy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
                        style={{ width: `${activeItem.energy}%` }}
                      />
                    </div>
                  </div>

                  {activeItem.relatedIds.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-purple-500/20">
                      <div className="flex items-center mb-2">
                        <Link size={10} className="text-purple-300/70 mr-1" />
                        <h4 className="text-[10px] uppercase tracking-wider font-bold text-purple-300/80">
                          Connected Stage Nodes
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.relatedIds.map((relatedId) => {
                          const relatedItem = timelineData.find(
                            (i) => i.id === relatedId
                          );
                          return (
                            <Button
                              key={relatedId}
                              variant="outline"
                              size="sm"
                              className="flex items-center h-6 px-2 py-0 text-[10px] font-bold uppercase rounded-none border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/80 text-purple-200 hover:text-white transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem?.title}
                              <ArrowRight
                                size={8}
                                className="ml-1 text-pink-400"
                              />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
